import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import Login from './pages/login.jsx';
import VerificationEmail from './pages/emailverify.jsx';
import EditPassword from './pages/password.jsx';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/email-verify' element={<VerificationEmail />} />
        <Route path='/forget-password' element={<EditPassword/>} />
      </Routes>
    </div>
  );
}

export default App;
