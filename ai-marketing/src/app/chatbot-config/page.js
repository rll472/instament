"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ChatbotConfig() {
  const [chatbotName, setChatbotName] = useState('');
  const [personality, setPersonality] = useState('');
  const [tone, setTone] = useState('friendly');
  const [instructions, setInstructions] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = { chatbotName, personality, tone, instructions };
    console.log('Chatbot Config:', config);
    // Here you could send this configuration to an API or save it in context/state.
    // For this example, we simply navigate to the chat page after "saving" the config.
    router.push('/chat');
  };

  return (
    <div style={styles.container}>
      <h1>Configure Your Chatbot</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Chatbot Name:
          <input
            type="text"
            value={chatbotName}
            onChange={(e) => setChatbotName(e.target.value)}
            style={styles.input}
            placeholder="Enter a name for your chatbot"
            required
          />
        </label>

        <label style={styles.label}>
          Personality:
          <textarea
            value={personality}
            onChange={(e) => setPersonality(e.target.value)}
            style={styles.textarea}
            placeholder="Describe personality traits (e.g., friendly, humorous, professional)"
            required
          />
        </label>

        <label style={styles.label}>
          Tone:
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            style={styles.select}
          >
            <option value="friendly">Friendly</option>
            <option value="formal">Formal</option>
            <option value="witty">Witty</option>
            <option value="professional">Professional</option>
          </select>
        </label>

        <label style={styles.label}>
          Custom Instructions:
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            style={styles.textarea}
            placeholder="Enter any custom instructions for your chatbot's behavior"
          />
        </label>

        <button type="submit" style={styles.button}>
          Save Configuration
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '1rem',
    fontWeight: 'bold'
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    marginTop: '0.5rem'
  },
  textarea: {
    padding: '0.5rem',
    fontSize: '1rem',
    marginTop: '0.5rem',
    height: '100px'
  },
  select: {
    padding: '0.5rem',
    fontSize: '1rem',
    marginTop: '0.5rem'
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};
