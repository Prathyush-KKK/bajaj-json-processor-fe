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
      console.log('Parsed input:', parsedInput) // Log parsed input

      const response = await fetch('/api/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedInput),
      })

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const data = await response.json()
      console.log('API response:', data) // Log API response
      setResponse(data)
    } catch (err) {
      console.error('Error:', err) // Log any errors
      setError(`Error: ${err instanceof Error ? err.message : String(err)}`)
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