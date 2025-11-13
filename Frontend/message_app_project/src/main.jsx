import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage.jsx';
import ProfileEditPage from './pages/ProfileEditPage.jsx';
import LogInPage from './pages/LogInPage.jsx';
import { Homepage } from './pages/Homepage.jsx';
import { NavBar } from './components/NavBar.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>

      <NavBar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/users/login' element={<LogInPage />} />
        <Route path='/profiles/:userId' element={<ProfilePage />} />
        <Route path='/profiles/edit' element={<ProfileEditPage />} />
        <Route path='/rooms/:roomId' element={<div>TODO! User room chat page</div>} />
      </Routes>
    </BrowserRouter>

  </StrictMode>
)
