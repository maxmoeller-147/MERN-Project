import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router';
import { ProfilePage } from './pages/ProfilePage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* <App /> */}
      <Routes>
        <Route path='/profiles/:userId' element={<ProfilePage />} />
        <Route path='/rooms/:roomId' element={<div>TODO! User room chat page</div>} />
      </Routes>

    </BrowserRouter>

  </StrictMode>
)
