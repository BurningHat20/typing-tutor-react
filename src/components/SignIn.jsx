import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const SignInComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center my-8">
      <SignIn 
        routing="path" 
        path="/sign-in" 
        afterSignInUrl="/lessons"
        redirectUrl="/lessons"
      />
    </div>
  );
};

export default SignInComponent;