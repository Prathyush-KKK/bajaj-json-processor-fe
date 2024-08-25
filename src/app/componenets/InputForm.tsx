import { useState } from 'react'

interface InputFormProps {
  setResponse: (response: any) => void
}

export default function InputForm({ setResponse }: InputFormProps) {
  const [input, setInput] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const parsedInput = JSON.parse(input)
      
      const response = await fetch('/api/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedInput),
      })

      if (!response.ok) {
        throw new Error('API request failed')
      }

      const data = await response.json()
      setResponse(data)
    } catch (err) {
      setError('Invalid JSON input or API error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
        rows={5}
        placeholder='Enter JSON (e.g., { "data": ["A","C","z"] })'
      />
      <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        Submit
      </button>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </form>
  )
}   