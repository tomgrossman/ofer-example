// pages/math-form.tsx

import React, { useState } from 'react';
import axios from 'axios';

const MathForm: React.FC = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/math/evaluate', { expression });
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a math expression"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
        />
        <button type="submit">Evaluate</button>
      </form>
      {result !== null && <p>Result: {result}</p>}
    </div>
  );
};

export default MathForm;
