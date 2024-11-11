import React from 'react'

const CurrencyCard = () => {
  return (
    <div>
        <Card
            key={crypto.id}
            className="overflow-hidden shadow-lg"
            title={
              <div className="flex justify-between items-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4">
                <span>{crypto.name} ({crypto.symbol})</span>
                <span className={`text-sm ${crypto.change24h >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                  {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h}%
                </span>
              </div>
            }
            bodyStyle={{ padding: '1rem' }}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Price:</span>
              <span className="font-semibold">${crypto.price.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Market Cap:</span>
              <span className="font-semibold">${(crypto.marketCap / 1e9).toFixed(2)}B</span>
            </div>
          </Card>
    </div>
  )
}

export default CurrencyCard