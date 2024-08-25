'use client'

import { useState, useEffect } from 'react';
import InputForm from './componenets/InputForm';
import Modal from './componenets/Modal';

export default function Home() {
  const [response, setResponse] = useState<any>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleGetRequest = async () => {
    try {
      const res = await fetch('/api/bfhl');
      const data = await res.json();
      setResponse(data);
      setModalOpen(true); // Open the modal with the response
    } catch (error) {
      console.error('Error fetching operation code:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">21BCE0930</h1>
      
      <div className="border border-white p-4">
        <h2 className="text-2xl font-semibold">Technologies Used</h2>
        <ul className="list-disc pl-5 mt-2">
          <li>Next.js (version 14.2.6)</li>
          <li>React (version 18)</li>
          <li>React Select (version 5.8.0)</li>
          <li>TypeScript (version 5)</li>
          <li>Tailwind CSS (version 3.4.1)</li>
          <li>ESLint (version 8)</li>
          <li>PostCSS</li>
          <li>Serverless routing using Next.js and Vercel</li>
        </ul>
      </div>
      
      <InputForm setResponse={setResponse} />
      <button 
        onClick={handleGetRequest} 
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Get Operation Code
      </button>
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        response={response} 
      />
    </main>
  );
}
