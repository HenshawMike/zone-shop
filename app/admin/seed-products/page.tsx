'use client'

import { useState } from 'react'

export default function SeedProductsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleSeedProducts = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/seed-products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      setResult(data)

      if (!response.ok) {
        throw new Error(data.error || 'Failed to seed products')
      }

      // Success feedback is handled by state
    } catch (error) {
      console.error('Error seeding products:', error)
      setResult({ error: error instanceof Error ? error.message : 'Unknown error occurred' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Seed Products</h1>

      <button
        onClick={handleSeedProducts}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? 'Seeding Products...' : 'Seed Products'}
      </button>

      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h2 className="text-lg font-semibold mb-2">Results:</h2>
          <pre className="bg-white p-4 rounded overflow-auto max-h-96">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
