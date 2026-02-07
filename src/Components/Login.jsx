import { Eye } from 'lucide-react';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Login() {

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [SeePassword, setSeePassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    let response;
    try {
      response = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password
      }, { withCredentials: true });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      console.log(response.data)

      if (response && response.status === 200) {
        navigate('/home');
      }
      console.log('Login successful:', response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError(error.response.data.message || "Wrong email or password");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  }






  return (
    <>
      <section className="min-h-screen ">
        <div className="flex flex-col justify-center items-center min-h-screen w-full px-6 py-8">

          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-sm xl:p-0 border border-gray-300">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Sign in to your account
              </h1>

              <form
                onSubmit={handleSubmit}
                className="space-y-4 md:space-y-6">
                <div>

                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="name@company.com"
                    required
                  />
                </div>

                <div className='flex relative'>

                  <input
                    type={SeePassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mr-2"
                    required
                  />
                  <button type="button" onClick={() => setSeePassword(!SeePassword)}>
                    <Eye className='hover:text-blue-500 cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 ' />
                  </button>
                </div>

                {error && (
                  <p className="text-red-500 mt-2 text-sm uppercase">
                    {error}
                  </p>
                )}


                <button
                  type="submit"
                  className="w-full text-white bg-[#0067b8] hover:bg-[#0863a9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
                >
                  Sign in
                </button>
                
              </form>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

export default Login;
