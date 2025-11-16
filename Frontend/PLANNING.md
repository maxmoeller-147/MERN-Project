**Style guide: https://javascript.airbnb.tech/react/**

Routes

**MAX**
Welcome page - somewebsite.com/ **DONE**
  - Welcome message and app logo **DONE**
  - Sign in button, to direct to sign in page **DONE**
  - Register button, to direct to register page **DONE**




**MAX**
Homepage - somewebsite.com/home **DONE**
  - Button for log out -> ask "do you want to log out, YES/NO", then direct to welcome page "somewebsite.com/" **DONE**
  - Friends list show all friends in connection, also show who is online with GREEN dot? Click on any friend with direct to their profile
  - List of group chat, click on any group chat will direct to the chat "somewebsite.com/rooms/:roomId"



**MAX**
Friend page - somewebsite.com/connection **DONE**
  
  - Button for adding friends -> direct to "friends/search" page
  - Click on any friend will show a list of options: **DONE**
  - Unfriend -> show alert/ confirm form "Are you sure?Yes/No", then delete connection with this user **DONE**
  - Message -> direct to chat **WAITING FOR CHAT PAGE**
  - Create Group -> direct to "somewebsite.com/rooms/create" with this friend **WAITING FOR ROOM PAGE**
  - View profile -> direct to profile page "somewebsite.com/profiles/:userId" **WAITING FOR PROFILE PAGE**
  - show all friends in connection. GREEN (or sth else) for PENDING connection




**JACK/PHUONG**
Log in page - somewebsite.com/users/login **DONE**
  - Email, password **DONE**
  - Forgot password/ reset password? **DONE**
  - Sign in successfully message **DONE** PHUONG: I fixed the sign in error, users are now signed in 

**JACK**
Register page - somewebsite.com/users/register **DONE**
  - Username, email, password, confirm password **DONE** 
  - register successfully message **DONE**

**PHUONG**
Friend search page - somewebsite.com/connection/search 
  - Search button
  - search results
  - Button for sending friend request
  - After request sent, Button changes to "SENT"




**PHUONG**
Profile page - somewebsite.com/profiles/:userId **PENDING**
  - Avatar image **PENDING**
  - Username **DONE**
  - Bio description **DONE**
  - Button for edit profile (for profile owner only) -> direct to "/profiles/edit" **DONE**
  
Profile edit page - somewebsite.com/profiles/:userId/edit  **PENDING**
  - image upload  **PENDING**
  - username and desciption  edit **DONE**
  - save button **DONE**

**JACK**
Room chat page - somewebsite.com/rooms/:roomId
  - all history messages
  - Button to send message
  - Message shows status: SENT/ DELIVERED/ SEEN/ COULD NOT SEND
  - Button to delete message
  - Button to add more users into the chat


**PHUONG**
Global context for page layout

Make all pages (except welcome page) to be only available to logged in user
Nav bar **DONE**
verify who the user is (CurrentUserContext) **MAX: I done some logic about this for FriendsPage**




























