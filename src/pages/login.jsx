import { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/Appcontex';
import axios from 'axios';
import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin,getUserData } = useContext(AppContext);

  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      axios.defaults.withCredentials = true;
      let response;

      if (state === 'Sign Up') {
        response = await axios.post(`${backendUrl}/api/auth/register`, {
          name,
          email,
          password,
        });
      } else {
        response = await axios.post(`${backendUrl}/api/auth/login`, {
          email,
          password,
        });
      }

      if (response.data.success) {
        setIsLoggedin(true);
        getUserData();
        toast.success(response.data.message || `${state} successful`);
        navigate('/');
      } else {
        toast.error(response.data.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Request failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400 relative">
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="Logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />

      <div className="bg-slate-900 p-10 rounded-lg shadow-lg text-center w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white mb-2">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </h2>

        <p className="mb-4">
          {state === 'Sign Up' ? 'Create your account' : 'Login to your account!'}
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === 'Sign Up' && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="person" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Full Name"
                required
                className="bg-transparent outline-none text-white w-full"
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="mail" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              required
              className="bg-transparent outline-none text-white w-full"
            />
          </div>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="lock" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="bg-transparent outline-none text-white w-full"
            />
          </div>

          {state === 'Login' && (
            <p
              onClick={() => navigate('/forget-password')}
              className="mb-4 text-indigo-400 text-left text-xs cursor-pointer hover:underline"
            >
              Forgot password?
            </p>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium transition-all hover:opacity-90"
          >
            {state}
          </button>
        </form>

        {state === 'Sign Up' ? (
          <p className="text-gray-400 text-center text-xs mt-4">
            Already have an account?{' '}
            <span
              className="text-blue-400 cursor-pointer hover:underline"
              onClick={() => setState('Login')}
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-gray-400 text-center text-xs mt-4">
            Don't have an account?{' '}
            <span
              className="text-blue-400 cursor-pointer hover:underline"
              onClick={() => setState('Sign Up')}
            >
              Sign up
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
