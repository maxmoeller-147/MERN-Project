import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage.jsx';
import ProfileEditPage from './pages/ProfileEditPage.jsx';
import LogInPage from './pages/LogInPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import { Homepage } from './pages/Homepage.jsx';
import { NavBar } from './components/NavBar.jsx';
import { WelcomePage } from './pages/WelcomePage.jsx';
import { Friends } from './pages/Friends.jsx';
import { NotFoundPage } from './pages/NotFoundPage.jsx';

import { Navigate } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>

      <NavBar />
      <Routes>
        
        <Route path='/' element={<WelcomePage />} />
        <Route path='/home' element={<Homepage />} />
        <Route path='/friends' element={<Friends />} />
        <Route path='/users/register' element={<RegisterPage />} />
        <Route path='/users/login' element={<LogInPage />} />
        <Route path='/profiles/:userId' element={<ProfilePage />} />
        <Route path='/profiles/edit' element={<ProfileEditPage />} />
        <Route path='/rooms/:roomId' element={<div>TODO! User room chat page</div>} />

        <Route path="/404" element={<NotFoundPage />} />
        
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>

  </StrictMode>
)
