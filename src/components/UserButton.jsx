import React from 'react';
import { UserButton } from '@clerk/clerk-react';

const UserButtonComponent = () => {
  return <UserButton afterSignOutUrl="/" />;
};

export default UserButtonComponent;