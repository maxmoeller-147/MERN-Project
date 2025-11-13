**Style guide: https://javascript.airbnb.tech/react/**

Routes

**MAX**
Welcome page - somewebsite.com/ 
  - Welcome message and app logo
  - Sign in button, to direct to sign in page
  - Register button, to direct to register page

**MAX**
Homepage - somewebsite.com/home
- Friends list show all friends in connection, also show who is online with GREEN dot? Click on any friend with direct to their profile
- Button for log out -> ask "do you want to log out, YES/NO", then direct to welcome page "somewebsite.com/"
- List of group chat, click on any group chat will direct to the chat "somewebsite.com/rooms/:roomId"



**MAX**
Friend page - somewebsite.com/connection
  - show all friends in connection. GREEN (or sth else) for PENDING connection
  - Click on any friend will show a list of options:
  - Message -> direct to chat
  - Create Group -> direct to "somewebsite.com/rooms/create" with this friend
  - View profile -> direct to profile page "somewebsite.com/profiles/:userId"
  - Unfriend -> show alert/ confirm form "Are you sure?Yes/No", then delete connection with this user




**JACK/PHUONG**
Log in page - somewebsite.com/users/login
  - Email, password
  - Forgot password/ reset password?
  - Sign in successfully message

**JACK**
Register page - somewebsite.com/users/register
  - Username, email, password, confirm password
  - verfify email? 
  - register successfully message

**JACK**
Friend search page - somewebsite.com/connection/search
  - Search button
  - search results
  - Button for sending friend request
  - After request sent, Button changes to "SENT"




**PHUONG**
Profile page - somewebsite.com/profiles/:userId
  - Avatar image
  - Username
  - Bio description
  - Button for edit profile (for profile owner only) -> direct to "/profiles/:userId/edit"
  
Profile edit page - somewebsite.com/profiles/:userId/edit
  - image upload
  - username and desciption  edit
  - save button

**PHUONG**
Room chat page - somewebsite.com/rooms/:roomId
  - all history messages
  - Button to send message
  - Message shows status: SENT/ DELIVERED/ SEEN/ COULD NOT SEND
  - Button to delete message
  - Button to add more users into the chat


**PHUONG**
Global context for page layout

Nav bar



























