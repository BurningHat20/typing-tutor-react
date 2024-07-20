import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const SignInComponent = () => {
  return (
    <div className="flex justify-center items-center my-8">
      <SignIn />
    </div>
  );
};

export default SignInComponent;