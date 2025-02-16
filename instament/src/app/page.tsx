"use client";

import { useState, FormEvent } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSentiment('');
    setError('');

    try {
      const res = await fetch('/api/sentiment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'An error occurred');
      } else {
        setSentiment(data.sentiment);
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const clearFields = () => {
    setText('');
    setSentiment('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Instant Sentiment Analyzer
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
        />
        <div className="flex justify-between mt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-1/2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Analyzing...' : 'Analyze Sentiment'}
          </button>
          <button
            type="button"
            onClick={clearFields}
            className="w-1/2 ml-4 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition"
          >
            Clear Field
          </button>
        </div>
      </form>
      {error && <p className="mt-4 text-red-600">{error}</p>}
      {sentiment && (
        <div className="mt-6 p-4 bg-white shadow rounded-md">
          <h2 className="text-2xl font-semibold text-gray-700">
            Sentiment Analysis Result:
          </h2>
          <p className="mt-2 text-gray-600">{sentiment}</p>
        </div>
      )}
    </div>
  );
}
