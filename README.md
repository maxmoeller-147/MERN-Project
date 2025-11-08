# MESSAGE APP (MERN Project)

This project is a **backend API** that provides profile management, connections, user authotentication and real time chats. 
Is built for a MERN (MongoDB, Express, React, NodeJS) based Message app.
 
---

## Overview
The app allows users to:
- Connect with other users.
- Create, update and delete room chat.
- Join room chat and chat in real time using Socket.IO
- Upload and update images for profiles using Multer.
- Create, update and delete user profile.


## **Dependent Software and Packages**
| Technology | Fuction | License | Alternatives 
|------------|---------|---------| ----------| 
|**NodeJS / ExpressJS**| Main framework for middleware, handling routes and APIs.| MIT | Koa, Fastify, Hapi |
|**CORS**| Manages request between frontend and backend | MIT | 
|**Helmet**| Adds HTTP headers for more API security and access control| MIT |
|**Socket.IO**| Enables real time chats with a communication between users and the server | MIT | Websocket API, Pusher |
|**Mongoose**| Give structure and validation for MongoDB data simplifing data modeling| MIT | MySQL, PostgreSQL |
|**JSON Web Token (JWT)**| To ensure authentication and input handling | MIT |
|**Multer**| For profile pictures and simpler file and media handling| MIT | Formidable, Busboy |
|**Jest and Supertest**| for testing and simulating functions| MIT | vitest, mocha |
|**Validators**| Serves a secure input handling like JWT | MIT |

------------

### Node.Js
Core environment of the backend. Allows JavaScript to run in the app outside of the browser so we can use the same languague in the backend and frontend. Provides asynchonus, event-driven architecture that ensures very efficient handling of mutiple requests at the same time. We choosed Node.js instead of other technolies like Flask or Django because its one the most widely used backend techonolies right now and is ideal for this prject idea of a chatting real time chatting app where the data is processed and transmitted between users in instants. 

### Express.Js
Framework for web applications used to handle server logic, routing and middleware within the Node environment. Manages HTTP request and responses, and defines the API endpoints in a simplier way. We used for the foundations of the server.js and the routes of this prject like /users, /profiles, /connection. And the implementation of athentification, session and error handling. We choosed Express instead of Koa or Fastify because is the most advance and supported by the community, it's simple and easy to use.

### MongoDB and Mongoose
For our project database we used MongoDB(NoSQL) connected through the object data modelling library Mongoose, that simplifies data handling in Node. MongoDB stores data in a free schema and scalable data management way in form of flexible JSON files making it perfect for aplications where user profiles and their messages can have different structures. With Mongoose we could implement schemas, validations and relationships.
MongoDB offers better performance for dynamic and realtime data models and operations, because of that we choosed this technology and not others like PostgreSQL or MySQL.

### Helmet and CORS
Helmet set configurations for HTTP response headers to protect the server from web vulnerabilities. Meanwhile, CORS controls which client domains are permitted to interact with our API, meaning only authorized external sourced can access. Both technologies reinforce this project security infrasctructure.

### JWT - Jsonwebtoken
This package implements athentification using JSON Web Tokens. Allowing verification of users identities by joining user data with encrypted tokens signed with a secret key. JWT doesn't require server storage of session helping the app to run on better performance. Other alternatives to this are AuthO and PassportJS.

### Jest nad SuperTest
This are testing tools, Jest is used for mainly testing framework with a fast and reliable integration testing with built in mocking options. Supertest is an extension of Jest that adds direct HTTP assertions on Express endpoints for an end to end API testing in a controlled environment.

### Cookie Parser and Validator
Cookie Parser parses the cookies sent by clients, allowing easy access to their session and is a solution for cookie based authentification. On the other hand, Validator library is used to ensure that user data meets specific format and/or requirements, like checking if the email is valid before adding it to the database for example.

### Multer
Is used to manage file uploads in the application, primarily for profile images and chat media. Defines destination paths and naming conventions for stored files. There are alternatives like Formidable or Busboy but they require more manual setup, Multer's is efficient and easy to use.

**ALL DEPENDENCIES USED ARE LICENSED UNDER THE MIT LICENSE, WITH AND OPEN-SOURCE NATURE AND INDUSTRY RELEVANCE**


---------------------

# INSTALLATION GUIDE

## Hardware and System Requirements
To run this application you need minimal hardware. A 64-bit operation system (MacOS, Windows10 or Linux) with a at least 4gb of RAM to run Node.Js and MongoDB in comftable way, and a stable internet connection to support local server execution and Websocket communication. Plus a minimun of 2gb storage for dependencies and database storage.
Node.JS and it's package manager

---------------------
## Programming style
This project used W3school JavaScript style guide (link: https://www.w3schools.com/js/js_conventions.asp). The style guide describes the general Javascript code conventions, including:
- Naming and declaration rules for variables and functions.
- Rules for the use of white space, indentation, and comments.
- Programming practices and principles.

Please follow this style guide when you contribute to the project. This ensure code readbility and ensure coding style consistent. Thank you for your support!
