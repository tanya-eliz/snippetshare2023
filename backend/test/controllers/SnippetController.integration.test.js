import * as SnippetController from '../../controllers/SnippetController';
import Snippet from '../../models/Snippet';
const db = require('../utils/db');

let req, res, next;
let initSnippet;

describe('SnippetController', () => {
  beforeAll(async () => {
    // Stub all console.log calls
    jest.spyOn(console, 'log').mockImplementation(() => {});

    // Set up mock db

    await db.setUp();
    // create 1 snippet
    const snippet = new Snippet({
      title: 'test title',
      content: 'test content',
    });
    initSnippet = await snippet.save();
  });

  beforeEach(() => {
    res = {
      send: jest.fn(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterAll(async () => {
    await db.dropDatabase();
    // Restore all console.log calls
    console.log.mockRestore();
  });

  it('should return 1 snippet (first run of getSnippetsWithPagination)', async () => {
    req = {
      query: {
        page: 1,
        limit: 10,
        orderBy: 'createdAt',
      }
    };
    await SnippetController.getSnippetsWithPagination(req, res, next);
    expect(res.send).toHaveBeenCalledTimes(1);
    // Save res.send.calledWith() arguments into a variable
    const response = res.send.mock.calls[0][0];
    expect(response.snippets.length).toBe(1);
    const snippet = response.snippets[0];
    expect(snippet.content).toBe(undefined); // content shouldnt be included in response for listing
    const expectedObject = {
      title: initSnippet.title,
      viewCount: 0,
      id: initSnippet._id,
      createdAt: initSnippet.createdAt,
      expiry: initSnippet.expiry,
    }
    expect(response).toMatchObject({
      snippets: [expectedObject],
      totalPages: 1,
      currentPage: 1,
    });
    expect(next).toHaveBeenCalledTimes(0);
  });

  it('should fail to create a snippet when invalid input is given(createSnippet)', async () => {
    req = {}
    req.body = {
      title: 'test title 2',
      content: 'test content 2',
      tte: {
        "days": -1,
      }
    };
    await SnippetController.createSnippet(req, res, next);
    expect(res.json).toHaveBeenCalledTimes(0);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should create a snippet successfully(createSnippet)', async () => {
    req = {}
    req.body = {
      title: 'test title 2',
      content: 'test content 2',
      tte: {
        "days": 1,
      }
    };
    await SnippetController.createSnippet(req, res, next);
    expect(res.json).toHaveBeenCalledTimes(1);
  });

  it('should now be able to return 2 snippets with newly added snippet on top(second run of getSnippetsWithPagination)', async () => {
    req = {
      query: {
        page: 1,
        limit: 10,
        orderBy: 'createdAt',
      }
    };
    await SnippetController.getSnippetsWithPagination(req, res, next);
    expect(res.send).toHaveBeenCalledTimes(1);
    // Save res.send.calledWith() arguments into a variable
    const response = res.send.mock.calls[0][0];
    expect(response).toHaveProperty('snippets');
    expect(response).toHaveProperty('totalPages');
    expect(response).toHaveProperty('currentPage');
    expect(response.snippets.length).toBe(2);
    const snippet = response.snippets[0];
    expect(snippet).toHaveProperty('title');
    expect(snippet.content).toBe(undefined); // content shouldnt be included in response for listing
    expect(snippet).toHaveProperty('expiry');
    expect(snippet).toHaveProperty('viewCount');
    expect(snippet.title).toBe('test title 2'); // should be the latest snippet
    expect(snippet.viewCount).toBe(0);
    // Expiry Date should be approximately 1 day from now
    const now = new Date();
    const expiryDate = new Date(snippet.expiry);
    const diff = expiryDate - now;
    expect(diff).toBeGreaterThan(0); // Not expired
    expect(diff).toBeLessThan(1000*60*60*24); // Less than 1 day (due to time between test runs)
    expect(response.totalPages).toBe(1);
    expect(response.currentPage).toBe(1);
    expect(next).toHaveBeenCalledTimes(0);
  });

  it('should return 1 snippet with viewCount of 1 (getSnippetById)', async () => {
    req = {}
    req.params = {
      id: initSnippet._id,
    };
    await SnippetController.getSnippetById(req, res, next);
    expect(res.send).toHaveBeenCalledTimes(1);
    // Save res.send.calledWith() arguments into a variable
    const response = res.send.mock.calls[0][0];
    expect(response).toMatchObject({
      title: initSnippet.title,
      content: initSnippet.content,
      viewCount: 0, //First call should be 0
      createdAt: initSnippet.createdAt,
    });

    // Reset res.send mock
    res.send.mockClear();

    // Second call should be 1
    await SnippetController.getSnippetById(req, res, next);
    expect(res.send).toHaveBeenCalledTimes(1);
    const response2 = res.send.mock.calls[0][0];
    expect(response2).toMatchObject({
      title: initSnippet.title,
      content: initSnippet.content,
      viewCount: 1,
      createdAt: initSnippet.createdAt,
    });
  });

  it('should return error when invalid id is passed (getSnippetById)', async () => {
    req = {}
    req.params = {
      id: 'asdlnasldnasld',
    };
    await SnippetController.getSnippetById(req, res, next);
    expect(res.send).toHaveBeenCalledTimes(0);
    expect(next).toHaveBeenCalledTimes(1);
  });

});

