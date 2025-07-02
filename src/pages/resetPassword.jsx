import React, { useState, useRef, useContext } from 'react';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/Appcontex';


function ResetPassword() {
  
  const { backendUrl } = useContext(AppContext);
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpSubmited, setIsOtpSubmited] = useState(false);
  const inputRefs = useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/request-password-reset`, { email });
      data.success ? toast.success(data.message) : toast.error(data.message);
      if (data.success) setIsEmailSent(true);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map(input => input.value);
    const fullOtp = otpArray.join('');
    setOtp(fullOtp);
    setIsOtpSubmited(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/reset-password`, {
        email,
        otp,
        newPassword,
      });
      data.success ? toast.success(data.message) : toast.error(data.message);
      if (data.success) navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400 relative">
      <div className="absolute top-5 left-5 sm:left-20">
        <img onClick={() => navigate('/')}
        src={assets.logo} alt="Logo" className="w-28 sm:w-32 cursor-pointer" />
      </div>

      {!isEmailSent && (
        <form onSubmit={onSubmitEmail} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm mt-24">
          <h1 className="text-white text-2xl font-semibold text-center mb-4">Reset Password</h1>
          <p className="text-center mb-6 text-indigo-300">Enter your registered email</p>
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.mail_icon} className='w-3 h-3' />
            <input
              type="email"
              placeholder='Email id'
              className='bg-transparent outline-none text-white'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3'>Submit</button>
        </form>
      )}

      {!isOtpSubmited && isEmailSent && (
        <form onSubmit={onSubmitOtp} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
          <h1 className="text-white text-2xl font-semibold text-center mb-4">Reset Password OTP</h1>
          <p className="text-center mb-6 text-indigo-300">Enter the 6-digit code sent to your email id</p>
          <div className="flex justify-between mb-6">
            {Array(6).fill(0).map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                required
                ref={(el) => (inputRefs.current[index] = el)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
              />
            ))}
          </div>
          <button type="submit" className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full">
            Submit
          </button>
        </form>
      )}

      {isOtpSubmited && isEmailSent && (
        <form onSubmit={onSubmitNewPassword} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm mt-24">
          <h1 className="text-white text-2xl font-semibold text-center mb-4">New Password</h1>
          <p className="text-center mb-6 text-indigo-300">Enter the new password below</p>
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.lock_icon} className='w-3 h-3' />
            <input
              type="password"
              placeholder='Password'
              className='bg-transparent outline-none text-white'
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3'>Submit</button>
        </form>
      )}
    </div>
  );
}

export default ResetPassword;
