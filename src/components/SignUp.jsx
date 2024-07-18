import React from 'react';
import { SignUp } from '@clerk/clerk-react';

const SignUpPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <SignUp routing="path" path="/sign-up" />
    </div>
  );
};

export default SignUpPage;