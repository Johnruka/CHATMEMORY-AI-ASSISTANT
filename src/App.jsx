import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [chatId, setChatId] = useState('');
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get('http://localhost:8080/memory/chat', {
        params: { chatId, question },
      });
      setResponse(res.data);
    } catch (error) {
      console.error("There was an error fetching the chat response!", error);
      setResponse("Error: Couldn't fetch response.");
    }
  };
return (
    <div className="App">
      <h1>ChatMemory AI Assistant</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Chat ID:
          <input
            type="text"
            value={chatId}
            onChange={(e) => setChatId(e.target.value)}
            required
          />
        </label>
        <label>
          Question:
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </label>
        <button type="submit">Ask</button>
      </form>
      {response && (
        <div className="response">
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;