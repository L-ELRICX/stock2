// Mock function to fetch stock data
export async function fetchStockData(symbol: string) {
  // In a real application, this would make an API call to a stock data provider
  return {
    symbol,
    lastClose: Math.random() * 1000,
    previousClose: Math.random() * 1000,
  }
}

export function processData(data: any) {
  // In a real application, this would process the raw data from the API
  return data
}

export function calculateMetrics(data: any) {
  const change = data.lastClose - data.previousClose
  const pctChange = (change / data.previousClose) * 100

  return {
    lastClose: data.lastClose,
    change,
    pctChange,
  }
}

