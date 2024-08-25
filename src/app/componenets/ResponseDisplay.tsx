import { useState } from 'react'

interface ResponseDisplayProps {
  response: any
}

export default function ResponseDisplay({ response }: ResponseDisplayProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const handleOptionChange = (option: string) => {
    setSelectedOptions(prev =>
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    )
  }

  const filterResponse = () => {
    const filteredResponse: any = {}
    selectedOptions.forEach(option => {
      if (option === 'Alphabets' && response.alphabets) {
        filteredResponse.alphabets = response.alphabets
      }
      if (option === 'Numbers' && response.numbers) {
        filteredResponse.numbers = response.numbers
      }
      if (option === 'Highest lowercase alphabet' && response.highest_lowercase) {
        filteredResponse.highest_lowercase = response.highest_lowercase
      }
    })
    return filteredResponse
  }

  return (
    <div className="mt-8 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Response</h2>
      <div className="mb-4">
        <label className="block mb-2">Filter Options:</label>
        <div>
          <label className="mr-4">
            <input
              type="checkbox"
              checked={selectedOptions.includes('Alphabets')}
              onChange={() => handleOptionChange('Alphabets')}
            /> Alphabets
          </label>
          <label className="mr-4">
            <input
              type="checkbox"
              checked={selectedOptions.includes('Numbers')}
              onChange={() => handleOptionChange('Numbers')}
            /> Numbers
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedOptions.includes('Highest lowercase alphabet')}
              onChange={() => handleOptionChange('Highest lowercase alphabet')}
            /> Highest lowercase alphabet
          </label>
        </div>
      </div>
      <pre className="bg-gray-100 p-4 rounded bg-black">
        {JSON.stringify(filterResponse(), null, 2)}
      </pre>
    </div>
  )
}