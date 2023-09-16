import Snippet from "../models/Snippet.js";

// Utility Function to map ttlObject to get time offset in milliseconds
const getTimeOffset = async (tteOject) => {
  const { never, seconds, minutes, hours, days, months, years } = tteOject;
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
  if (months) {
    offset += Number(months) * 30 * 24 * 60 * 60 * 1000;
  }
  if (years) {
    offset += Number(years) * 365 * 24 * 60 * 60 * 1000;
  }
  if (offset==0) {
    throw new Error("Invalid option for expiry time")
  }
  return offset;
}

export const getSnippetsWithPagination = async (req, res) => {
  try {
    // Destructure the req.query to get page and limit and orderByColumn
    const { page=1, limit=10, orderBy='createdAt'} = req.query;

    // Process sort option with validation
    let sortObject = {};
    if (orderBy === 'createdAt') {
      sortObject = {createdAt: -1};
    } else if (orderBy === 'viewCount') {
      sortObject = {viewCount: -1};
    } else {
      throw new Error("Invalid orderBy option");
    }

    const now = new Date();
    const snippets = await Snippet.find({
      $or: [
        { expiry: { $eq: null } },
        { expiry: { $lt: now } }
      ]
    })
    .limit(limit*1)
    .skip((page - 1) * limit)
    .sort(sortObject);
    res.send(snippets);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
}

export const getSnippetById = async (req, res) => {
  try {
    const id = req.params['id'];
    console.log(id);
    // Increment the viewCount
    const snippet = await Snippet.findByIdAndUpdate({_id: id}, { $inc: {viewCount: 1}});
    res.send(snippet);
  } catch (error) {
    if (error.message == "No matching snippet found") {
      res.status(404).send({ error: error.message });
    } else {
      res.status(400).send({ error: "Invalid Snippet ID" });
    }
  }
}

export const createSnippet = async (req, res) => {
  try {
    const {title, content, tte} = req.body;
    const timestamp = await getTimeOffset(tte);
    let newSnippetParams = {title, content};
    if (timestamp !== -1) { // -1 means never expires
      const expiry = new Date(new Date().getTime() + timestamp);
      console.log(expiry)
    }
    const newSnippet = new Snippet(newSnippetParams);
    await newSnippet.save();
    res.json({
      message: "Snippet created successfully",
      id: newSnippet._id,
      expiry: newSnippet.expiry
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}

