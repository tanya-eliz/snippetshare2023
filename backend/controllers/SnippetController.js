import Snippet from "../models/Snippet.js";
import { BadRequestError, ExpiredError, NotFoundError } from "../errors/CustomError.js";

// Utility Function to map ttlObject to get time offset in milliseconds
const getTimeOffset = (tteOject) => {
  const { never, seconds, minutes, hours, days, weeks, months, years } = tteOject;
  let offset = 0;
  if (never) {
    return -1
  }
  if (seconds) {
    offset += Number(seconds) * 1000;
  }
  if (minutes) {
    offset += Number(minutes) * 60 * 1000;
  }
  if (hours) {
    offset += Number(hours) * 60 * 60 * 1000;
  }
  if (days) {
    offset += Number(days) * 24 * 60 * 60 * 1000;
  }
  if (weeks) {
    offset += Number(weeks) * 7 * 24 * 60 * 60 * 1000;
  }
  if (months) {
    offset += Number(months) * 30 * 24 * 60 * 60 * 1000;
  }
  if (years) {
    offset += Number(years) * 365 * 24 * 60 * 60 * 1000;
  }
  if (offset<=0) {
    throw new BadRequestError("Invalid input for expiry time")
  }
  return offset;
}
// Utility Function to compare expiry time with current time
const isExpired = (expiry) => {
  if (!expiry) return;
  const now = new Date();
  return now > Date.parse(expiry);
}

// Utility Function to map response of object
const mapResponse = (snippet,showContent=false) => {
  const { _id, title, content, expiry, viewCount, createdAt } = snippet;
  let mappedSnippets = {
    id: _id,
    title,
    expiry,
    viewCount,
    createdAt,
  }
  if (showContent) {
    mappedSnippets.content = content;
  }
  return mappedSnippets;
};

// Utility Function to validate input
const validateInput = (type, value) => {
  if (type === 'string') {
    if (typeof value !== 'string') {
      throw new BadRequestError("Invalid input type");
    }
  } else if (type === 'number') {
    try {
      Number(value);
    } catch (error) {
      throw new BadRequestError("Invalid input type");
    }
  } else if (type === 'object') {
    if (typeof value !== 'object') {
      throw new BadRequestError("Invalid input type");
    }
  } 
}

export const getSnippetsWithPagination = async (req, res, next) => {
  // Destructure the req.query to get page and limit and orderByColumn
  const { page=1, limit=10, orderBy='createdAt'} = req.query;
  validateInput('number', page);
  validateInput('number', limit);
  validateInput('string', orderBy);
  try {
    // Process sort option with validation
    let sortObject = {};
    if (orderBy === 'createdAt') {
      sortObject = {createdAt: -1};
    } else if (orderBy === 'viewCount') {
      sortObject = {viewCount: -1};
    } else {
      throw new BadRequestError("Invalid orderBy option");
    }
  
    const now = new Date();
    const snippets = await Snippet.find({
      $or: [
        { expiry: { $eq: null } },
        { expiry: { $gt: now } }
      ]
    })
    .limit(limit*1)
    .skip((page - 1) * limit)
    .sort(sortObject);
    const mappedSnippets = snippets.map(i => mapResponse(i));
    const count = await Snippet.estimatedDocumentCount();
    res.send({snippets: mappedSnippets, totalPages: Math.ceil(count / limit), currentPage: Number(page)});
  } catch (error) {
    next(error);
  }
}

export const getSnippetById = async (req, res, next) => {
  const id = req.params['id'];
  try {
    const snippet = await Snippet.findByIdAndUpdate({_id: id}, { $inc: {viewCount: 1}});
    if (!snippet) throw new NotFoundError("Snippet not found");
    if (isExpired(snippet.expiry)) throw new ExpiredError("Snippet has expired");
    const mappedSnippet = mapResponse(snippet, true);
    res.send(mappedSnippet);
  } catch (error) {
    next(error);
  }
}

export const createSnippet = async (req, res, next) => {
  try {
    const {title, content, tte} = req.body;
    const timestamp = getTimeOffset(tte);
    console.log(timestamp);
    let newSnippetParams = {title, content};
    if (timestamp !== -1) { // -1 means never expires
      const expiry = new Date(new Date().getTime() + timestamp);
      newSnippetParams.expiry = expiry;
    }
    const newSnippet = new Snippet(newSnippetParams);
    await newSnippet.save();
    res.json({
      message: "Snippet created successfully",
      id: newSnippet._id,
      expiry: newSnippet.expiry
    });
  } catch (error) {
    next(error);
  }
}
