// src/components/LandingPage.jsx
import React from 'react';
import { SignInButton, SignUpButton, useUser } from '@clerk/clerk-react';

const LandingPage = () => {
  const { isSignedIn, user } = useUser();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 text-white">
      <h1 className="text-5xl font-bold mb-8">Welcome to Pro Typing Tutor</h1>
      <p className="text-xl mb-8">Improve your typing skills with our advanced tutor!</p>
      
      {isSignedIn ? (
        <div className="text-center">
          <p className="mb-4">Welcome back, {user.firstName}!</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-white text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-100 transition duration-300"
          >
            Start Typing
          </button>
        </div>
      ) : (
        <div className="space-x-4">
          <SignInButton mode="modal">
            <button className="bg-white text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-100 transition duration-300">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="bg-transparent border-2 border-white text-white font-bold py-2 px-4 rounded hover:bg-white hover:text-blue-500 transition duration-300">
              Sign Up
            </button>
          </SignUpButton>
        </div>
      )}
    </div>
  );
};

export default LandingPage;