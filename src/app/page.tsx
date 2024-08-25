'use client'

import { useState } from 'react'
import InputForm from './componenets/InputForm'
import ResponseDisplay from './componenets/ResponseDisplay'

export default function Home() {
  const [response, setResponse] = useState<any>(null)

  const handleGetRequest = async () => {
    try {
      const res = await fetch('/api/bfhl')
      const data = await res.json()
      setResponse(data)
    } catch (error) {
      console.error('Error fetching operation code:', error)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Your Roll Number</h1>
      <InputForm setResponse={setResponse} />
      <button onClick={handleGetRequest} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
        Get Operation Code
      </button>
      {response && <ResponseDisplay response={response} />}
    </main>
  )
}