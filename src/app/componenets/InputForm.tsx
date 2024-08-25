import { useState, useEffect } from 'react';
import Select from 'react-select';

const options = [
  { value: 'numbers', label: 'Numbers' },
  { value: 'alphabets', label: 'Alphabets' },
  { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' },
];

interface InputFormProps {
  setResponse: (response: any) => void;
}

export default function InputForm({ setResponse }: InputFormProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [selectedOption, setSelectedOption] = useState<{ value: string, label: string }[]>([{ value: 'numbers', label: 'Numbers' }]);
  const [response, setResponseState] = useState<any>(null);

  useEffect(() => {
    document.title = '21BCE0930'; // Set the website title to your roll number
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const parsedInput = JSON.parse(input);

      const res = await fetch('/api/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedInput),
      });

      if (!res.ok) {
        throw new Error('API request failed');
      }

      const data = await res.json();
      setResponseState(data);
    } catch (err) {
      setError('Invalid JSON input or API error');
    }
  };

  const handleSelectChange = (selected: any) => {
    setSelectedOption(selected || []);
  };

  const renderFilteredResponse = () => {
    if (!response) return null;

    return selectedOption.map((option) => (
      <div key={option.value} className="mt-2">
        <strong>{option.label}:</strong> {response[option.value]?.join(', ') || 'N/A'}
      </div>
    ));
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border border-gray-400 bg-gray-800 rounded"
          rows={5}
          placeholder='Enter JSON (e.g., { "data": ["A","C","z"] })'
        />
        <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
          Submit
        </button>
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </form>

      {response && (
        <div className="mt-4">
          <label className="block mb-2 font-semibold">Multi Filter</label>
          <Select
            value={selectedOption}
            onChange={handleSelectChange}
            options={options}
            isMulti
          />
        </div>
      )}

      <div className="mt-4">
        {renderFilteredResponse()}
      </div>
    </div>
  );
}
