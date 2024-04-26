// pages/index.tsx

import React from 'react';
import LoginForm from '../components/LoginForm';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Ofer</h1>
      <LoginForm />
    </div>
  );
};

export default Home;
