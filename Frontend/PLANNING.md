Routes

Welcome page - somewebsite.com/ 
- Welcome message and app logo
- Sign in button, to direct to sign in page
- Register button, to direct to register page


Register page - somewebsite.com/users/register
- Username, email, password, confirm password
- verfify email? 
- register successfully message


Sign in page - somewebsite.com/users/signin
- Email, password
- Forgot password/ reset password?
- Sign in successfully message


Homepage - somewebsite.com/home
- Friends list show all friends in connection, also show who is online with GREEN dot? Click on any friend with direct to their profile
- Button for connecting new friend -> direct to "somewebsite.com/connection/search" for creating new connection
- List of group chat, click on any group chat will direct to the chat "somewebsite.com/rooms/:roomId"

Friend search page - somewebsite.com/connection/search
- Search button
- search results
- Button for sending friend request
- After request sent, Button changes to "SENT"


Friend page - somewebsite.com/connection
- show all friends in connection. GREEN (or sth else) for PENDING connection
- Click on any friend will show a list of options:
  - Message -> direct to chat
  - Create Group -> direct to "somewebsite.com/rooms/create" with this friend
  - View profile -> direct to profile page "somewebsite.com/profiles/:userId"
  - Unfriend -> show alert/ confirm form "Are you sure?Yes/No", then delete connection with this user


Room chat page - somewebsite.com/rooms/:roomId
- all history messages
- Button to send message
- Message shows status: SENT/ DELIVERED/ SEEN/ COULD NOT SEND
- Button to delete message
- Button to add more users into the chat

Profile page - somewebsite.com/profiles/:userId
- Avatar image
- Bio description
- Button for edit profile (for profile owner only) -> change UI to profile edit form, with image upload and writing bio desciption and save button











