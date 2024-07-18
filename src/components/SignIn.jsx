import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <SignIn routing="path" path="/sign-in" redirectUrl="/lessons" />
    </div>
  );
};

export default SignInPage;