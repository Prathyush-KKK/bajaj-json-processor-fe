'use client'

import { useState } from 'react'
import InputForm from './componenets/InputForm'
import ResponseDisplay from './componenets/ResponseDisplay'

export default function Home() {
  const [response, setResponse] = useState<any>(null)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">21BCE0930</h1>
      <InputForm setResponse={setResponse} />
      {response && <ResponseDisplay response={response} />}
    </main>
  )
}