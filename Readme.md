# Snippet Share 2023

## Introduction
This is a full stack application built using the MERN stack (MongoDB, Express, React and Node.js).


The purpose of this application is to allow users to create snippets of text that will expire after a certain amount of time. The snippets will be stored in a database and the frontend application will be able to retrieve the snippets from the database and display them to the user.


## Getting Started


### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) needs to be installed on your machine.
- Port 3000 and 4000 needs to be available on your machine.
- You will also need to create a `.env` file in the root directory of the repository, you may refer to the `.env.example` file for the required environment variables and set any arbitrary values for them.


### Installation
1. Clone the repository to your local machine.
2. Start docker on your machine.
3. Navigate to the root directory of the repository, which is here.
4. Run `docker-compose up` to start the application.
5. The frontend application will be accessible at [`http://localhost:3000`](http://localhost:3000) and the backend application will be accessible at [`http://localhost:4000`](http://localhost:4000).


### Rebuilding and Containers After Changes to FE/BE (Optional)
1. Navigate to the root directory of the repository, which is here.
2. Run `docker-compose up --build` to rebuild and restart the application.


### Tear down and Clean-up
1. Press `Ctrl + C` to stop the application.
2. Run `docker-compose down` to stop the containers.
3. Run `docker-compose rm` to remove the containers.
4. Run `docker volume prune` to remove the volumes.
5. Run `docker network prune` to remove the network.
6. Run `docker image prune` to remove the images.
7. Run `docker system prune` to remove all unused data.


## For more details on the application, please refer to the following Readme files:
1. [Frontend Readme](./frontend/Readme.md)
2. [Backend Readme](./backend/Readme.md)



