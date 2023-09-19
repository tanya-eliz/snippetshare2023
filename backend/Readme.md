# Backend Repository


## Description
This repository consist of the code implementation for a Node.js server with Express.js framework for REST API and Mongoose as ORM for MongoDB interacting with MongoDB database.


## API Endpoints Documentation:
There are currently only 3 API endpoints to serve the frontend application. The API endpoints are as follows:


**1. [GET] /api/snippets**
> Description:
>- This endpoint is used to list information of all the snippets that are not expired in the database, with options to paginate the results and sort the results by `createdAt` or `viewCount` in descending order.
>- Accepts Optional Request Query Parameters: `page` and `limit` and `orderBy`.
>- The default value for `page` is 1 and `limit` is 10 and `orderBy` is `createdAt`. The `orderBy` parameter accepts `createdAt` and `viewCount` as values.
>- The contents are hidden in the response for this endpoint as we are listing all the snippets in the database. The contents are only shown in the response for the GET /api/snippets/:id endpoint.
>
> Sample Request: `[GET] ${be_url}/api/snippets?page=1&limit=1`
>
> Output:
> ```
> {
> "snippets": [
> {
> "id": "6506b22c1a4851643c957ff3",
> "title": "2",
> "expiry": "2023-09-17T08:04:04.185Z",
> "viewCount": 0,
> "createdAt": "2023-09-17T08:24:47.588Z"
> }
> ],
> "totalPages": 2,
> "currentPage": 1
> }
> ```


**2. [POST] /api/snippets**
> Description:
>- This endpoint is used to create a new snippet in the database.
>- Accepts Request Body Parameters as JSON body: `title`, `content` and `tte`.
>- The `title` and `content` parameters are should be of type string and `tte` should be object.
>- The `tte` should at least have one of the following properties: `never`,`seconds`,`minutes`, `hours`, `days`, `weeks`, `months` and `years`.
>- If `never` is present, then the snippet will never expire. If not, then at least one of the other properties should be present and the value of that key should be a number that is greater than 0.
>- Upon successful creation, the response will contain the `id` of the newly created snippet and the `expiry` timestamp of the snippet.
>
> Sample Request: `[POST] ${be_url}/api/snippets`
>
> Request Body (JSON):
> ```
> {
> "title": "Test Upload",
> "content": "Test Content",
> "tte": {
> "hours": 1
> }
> }
>```
> Output:
> ```
> {
> "message": "Snippet created successfully",
> "id": "6506b7cf87b518320711e8a4",
> "expiry": "2023-09-17T09:24:47.587Z"
> }
> ```


**3. [GET] /api/snippets/:id**
> Description:
>- This endpoint is used to retrieve the information of a snippet with the given `id` in the database and increment the `viewCount` of the snippet by 1.
>- If the snippet is expired or the snippet id is invalid, then the response will contain the `message` property with the appropriate error message.
>- Accepts Request Path Parameter: `id`.
>- Upon successful retrieval, the response will contain the `id`, `title`, `content`, `expiry` timestamp and `viewCount` of the snippet.
>
> Sample Request: `[GET] ${be_url}/api/snippets/6506b7cf87b518320711e8a4`
>
> Output:
> ```
> {
> "id": "6506b7cf87b518320711e8a4",
> "title": "Test Upload",
> "expiry": "2023-09-17T09:24:47.587Z",
> "viewCount": 1,
> "content": "Test Content"
> "createdAt": "2023-09-17T08:24:47.588Z"
> }
> ```


## Other Implementation Details:
1) Expiry of a snippet is implemented by using query hooks to filter out expired snippets in the database for the `GET /api/snippets` endpoint which views a list of snippets and a function to validate that the content of the snippet is not expired for the `GET /api/snippets/:id` endpoint which views a single snippet.


2) Additionally, TTL indexes are also used to remove expired snippets from the database. The TTL index is set to expire the document after the `expiry` timestamp of the snippet. This is to ensure that the expired snippets are removed from the database and this process is handled by MongoDB itself in the background.


3) Cors is implemented to only allow cross-origin requests from the frontend application and restricting it to only GET and POST requests.

## Automated Tests:
1) Automated tests are implemented using Jest and MongoDB Memory Server.
2) The tests are located in the `tests` folder in this backend repository.
3) To run the tests, you will need to have the backend application running on your machine. As in memory MongoDB is used for testing, you do not need to have MongoDB installed on your machine nor do you need the docker containers to be running. But you will need to have Node.js installed on your machine.
4) If this is your first time running the tests, you will need to run `npm install` and `npm install --save-dev` in the `backend` folder to install the required dependencies.
5) Once the dependencies are installed, you can run `npm test` in the `backend` folder to run the tests.

## Future Improvements:
1) Implementing features like rate limiting and authentication.
2) Implementing a more robust validation system for the API endpoints.
3) Refactoring the code and extracting logic from the controller to services.
4) Increasing Test Coverage


## Instructions to run the application:
- Head back to the root directory and run ```docker-compose up``` to start the containers for the application as specified in the root directory's [instructions](../Readme.md).
- Once the containers are up and running, the backend application can be accessed at http://localhost:4000.


