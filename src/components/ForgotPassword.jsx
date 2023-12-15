import { useState } from 'react';
import { useForgotPasswordMutation } from '../service/authApi';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [forgotPassword] = useForgotPasswordMutation();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword({ email }).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Error sending reset email', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center justify-center w-full">
        <form action="">
          <h1 className="text-2xl font-bold text-dark-blue mb-5 text-center font-montserrat">
            Forgot Password
          </h1>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-sm mt-1 w-full p-2 ps-4 border lg:w-[500px] rounded-2xl"
              placeholder="Masukan email"
            />
          </div>
          <button
            className="bg-dark-blue text-white w-full font-normal text-sm h-[50px] mt-5 rounded-2xl"
            onClick={handleForgotPassword}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
