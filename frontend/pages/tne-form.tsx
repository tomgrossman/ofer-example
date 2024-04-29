// pages/tne-form.tsx

import React, { useState } from 'react';
import axios from 'axios';

const PrettyPrintJson = ({ data }: { data: object }) => (
  <div>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>
);

const TneForm: React.FC = () => {
  const [imsi, setImsi] = useState('');
  const [result, setResult] = useState<object | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/identifiers/imsi', { imsi });
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="number" placeholder="Enter an IMSI" value={imsi} onChange={(e) => setImsi(e.target.value)} />
        <button type="submit">Get Result</button>
      </form>
      {result !== null && <p>Result: {PrettyPrintJson({ data: result })}</p>}
    </div>
  );
};

export default TneForm;
