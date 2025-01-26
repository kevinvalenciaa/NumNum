// This file is for experiment purposes only!!


import React, { useState } from 'react';
import { analyzeInput } from '../utils/api';

const AIPage = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleAnalyze = async () => {
    try {
      const result = await analyzeInput(input);
      setResponse(result.message);  // Display the response from the AI
    } catch (error) {
      setResponse('Error connecting to the AI backend.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>AI Interaction</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text here..."
        rows="5"
        style={{ width: '100%', marginBottom: '10px' }}
      ></textarea>
      <button onClick={handleAnalyze} style={{ padding: '10px', fontSize: '16px' }}>
        Analyze
      </button>
      {response && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <strong>Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default AIPage;
