import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';
import './index.css'; // If you're using Tailwind, make sure to import your CSS

const clerkPubKey = 'pk_test_aGVhbHRoeS1iZWFyLTgxLmNsZXJrLmFjY291bnRzLmRldiQ'; // Replace with your actual Clerk publishable key

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);