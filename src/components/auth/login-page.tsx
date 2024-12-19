'use client';

import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import Image from 'next/image';
import { IoChevronBack } from "react-icons/io5";
import nav from '../../../public/nav.png';

const LoginPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen text-primary-500 bg-gray-100 ">
      <div className='fixed text-gray-800 top-0 left-0 right-0 z-50 bg-white shadow-md'>
        <IoChevronBack className="text-primary-500 text-3xl ml-3 my-4" onClick={() => window.location.href = '/'} />
      </div>
      <div className=' flex flex-col justify-center py-12 px-4 pt-52'>
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-md">
        <div className="flex justify-center mb-5">
            <Image src={nav} className="w-auto h-12" alt="Navigation" />
            </div>
          <h2 className="text-center text-2xl font-bold mb-6 text-primary-500">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </h2>
            

          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <>
                <div className="mb-4">
                  <label className="block mb-2 text-sm">Name</label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block mb-2 text-sm">Surname</label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      name="surname"
                      value={formData.surname}
                      onChange={handleChange}
                      className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter your surname"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="mb-4">
              <label className="block mb-2 text-sm">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm">Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary-500 text-white py-2 rounded-md hover:bg-primary-600 transition duration-300"
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          <div className="text-center mt-4">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-primary-500 hover:underline"
            >
              {isSignUp 
                ? 'Already have an account? Sign In' 
                : 'Don\'t have an account? Sign Up'}
            </button>
          </div>
        </div>
      </div>
      </div>
      
    </div>
  );
};

export default LoginPage;
