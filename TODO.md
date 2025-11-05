# MERN-Project
API for the Mern Project "Dating App"


Style guide: Follow this https://www.w3schools.com/js/js_conventions.asp


1. Use Mongoose for database, with Express

2. Socket.io for web socket

3. Authentication features
- validate user login

4. Authorisation features
- only users with connection can view each other's profile
- only admin can view all user profiles and user information
- only people in the chat can see messages


5. Folder structure

-- src 
- controllers (**Phuong - except mentioned below**)
  - UserController.js 

  (*Note:*
  
  *Phuong make basic get, post requests*
  
  *Jack put authentication, authorisation middleware into controller for login feature*)
  - ProfileController.js
    (*Note:*
    *Phuong make basic get, post requests*
    *Jack put authentication, authorisation middleware into controller for veiwing profile feature*)

  - ConnectionController.js
  - UserRoomController.js
  - RoomChatControl
    (*Note:*
    *Phuong make basic get, post requests*
    *Jack put authentication, authorisation middleware into controller for viewing room chat and message in the chat*)

  - MessageController.js
  (*Note: unsure if we need authentication middleware here?*)

  - AttachmentController.js
- database (**Phuong**)
  - connectionManager.js
  - entities (models for all tables in database)
    - User.js
    - Profile.js
    ...
- middleware
  - AuthenticationMiddleware.js (**Jack**)
- utils
  - jwtFunctions.js (**Jack**)
- index.js (**Phuong**)
- server.js (**Phuong**)

4. Routes
