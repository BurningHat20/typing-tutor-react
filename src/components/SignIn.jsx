import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const SignInComponent = () => {
  const handleAuthenticated = () => {
    window.location.href = '/lessons';
  };

  return (
    <div className="flex justify-center items-center my-8">
      <SignIn onAuthenticated={handleAuthenticated} />
    </div>
  );
};

export default SignInComponent;