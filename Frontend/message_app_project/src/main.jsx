import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage.jsx";
import ProfileEditPage from "./pages/ProfileEditPage.jsx";
import LogInPage from "./pages/LogInPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import { Homepage } from "./pages/Homepage.jsx";
import { NavBar } from "./components/NavBar.jsx";
import { WelcomePage } from "./pages/WelcomePage.jsx";
import { FriendsPage } from "./pages/FriendsPage.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";
import { OnlyLoggedUsers } from "./components/OnlyLoggedUsers.jsx";
import { BaseLayout } from "./templates/BaseLayout.jsx";
import RoomChatPage from "./pages/RoomChatPage.jsx";
import FriendSearchPage from "./pages/FriendSearchPage.jsx";
import { FriendDataProvider } from "./Contexts/FriendDataContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <BrowserRouter>

        <Routes>
          <Route element={<BaseLayout />}>

            <Route path="/" element={<WelcomePage />} />
            <Route path="/users/login" element={<LogInPage />} />
            <Route path="/users/register" element={<RegisterPage />} />

            <Route path="/home" element={<Homepage />} />
            <Route path="/friends" element={<FriendDataProvider><FriendsPage/></FriendDataProvider>} />
            <Route path="/friends/search" element={<FriendDataProvider><FriendSearchPage/></FriendDataProvider>} />
            <Route path="/profiles/" element={<ProfilePage />} />
            <Route path="/profiles/:userId" element={<ProfilePage />} />
            <Route path="/profiles/edit" element={<ProfileEditPage />} />
            <Route path="/rooms/:roomChatId" element={<RoomChatPage />} />
            

            <Route path="/404" element={<NotFoundPage />} />
            
            <Route path="*" element={<Navigate to="/404" replace />} />

          </Route>
        </Routes>

       </BrowserRouter>



  </StrictMode>
)
