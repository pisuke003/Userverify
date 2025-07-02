import { useContext } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/Appcontex';
import axios from 'axios';
import { toast } from 'react-toastify';

function Navbar() {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContext);

  const handleLogout = async () => {
    try {
      await axios.post(`${backendUrl}/api/auth/logout`, {}, { withCredentials: true });
      setUserData(null);
      setIsLoggedin(false);
      toast.success("Logged out successfully");
      navigate('/');
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const handleVerify = async() => {
    try {
      axios.defaults.withCredentials=true;
      const{data}= await axios.post(`${backendUrl}/api/auth/send-verification-otp`)
      if (data.success){
 navigate('/email-verify');
 toast.success(data.mess)
      }
    } catch (error) {
      toast.error(data.message)
    }
   
  };

  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 fixed top-0 bg-white z-50 shadow-md'>
      <img
        src={assets.logo}
        alt="Logo"
        className="w-28 sm:w-32 cursor-pointer"
        onClick={() => navigate('/')}
      />

      {userData ? (
        <div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group cursor-pointer'>
          {userData.name[0].toUpperCase()}
          <div className='absolute hidden group-hover:block top-8 right-0 bg-white z-10 rounded shadow-md text-black text-sm w-40'>
            <ul className='list-none m-0 p-2'>
              {!userData.isAccountVerified && (
                <li
                  onClick={handleVerify}
                  className='py-1 px-3 hover:bg-gray-100 cursor-pointer'
                >
                  Verify Email
                </li>
              )}
              <li
                onClick={handleLogout}
                className='py-1 px-3 hover:bg-gray-100 cursor-pointer'
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate('/login')}
          className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all'
        >
          Login
          <img src={assets.arrow_icon} alt="" className='w-4' />
        </button>
      )}
    </div>
  );
}

export default Navbar;
