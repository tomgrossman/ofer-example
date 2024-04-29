// components/LoginForm.tsx

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios, { HttpStatusCode } from 'axios';

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(`/api/auth/login`, {
        email,
        password,
      }, { validateStatus: (status) => status < 500 });

      // Assuming your backend returns a status code indicating success (e.g., 200)
      if (response.status >= HttpStatusCode.Ok && response.status < HttpStatusCode.MultipleChoices) {
        console.log('Logged in successfully!');
        router.push('/tne-form');
      } else {
        // Handle other status codes (e.g., 401 for unauthorized)
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default LoginForm;
