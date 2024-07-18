import React from 'react';
import { SignIn, useClerk } from '@clerk/clerk-react';

const SignInComponent = () => {
  const { signIn } = useClerk();

  return (
    <div className="flex justify-center items-center my-8">
      <SignIn 
        signInUrl="/sign-in"
        afterSignInUrl="/lessons"
        routing="path"
        afterSignIn={(user) => {
          console.log("Sign in successful", user);
          // You can add additional logic here if needed
        }}
      />
    </div>
  );
};

export default SignInComponent;