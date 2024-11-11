import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSpecificDetail, fetchSpecificDetailHistory } from '../../services/store/Assets/actions'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Card, Spin } from 'antd'
import Chart from 'react-apexcharts'

const Detail = () => {
  const dispatch = useDispatch()
  const { assetDetail, specificAssetLoading, history, loadingHistory } = useSelector(state => state.assets)
  const location = useLocation()
  const navigate=useNavigate()

  useEffect(() => {
    const data = {
      id: location?.pathname?.split("/")[2]
    }
    dispatch(fetchSpecificDetail(data))
    dispatch(fetchSpecificDetailHistory(data))
  }, [dispatch, location])

  const chartOptions = {
    chart: {
      type: 'area',
      height: 350,
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return "$" + value.toFixed(2)
        }
      }
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy'
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100]
      }
    }
  }

  const chartSeries = [{
    name: 'Price USD',
    data: history?.map(item => ({
      x: new Date(item.date).getTime(),
      y: parseFloat(item.priceUsd)
    })) || []
  }]

  if (specificAssetLoading || loadingHistory) {
    return <div className="flex justify-center items-center h-screen"><Spin size="large" /></div>
  }
 const handleBack=()=>{
  navigate("/")
 }

  
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-6">
        <Button onClick={handleBack} className="mr-4">
          ← Back
        </Button>
        <h1 className="text-3xl font-bold">{assetDetail?.name} ({assetDetail?.symbol})</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Price Information</h2>
          <p className="text-4xl font-bold mb-2">${parseFloat(assetDetail?.priceUsd).toFixed(2)}</p>
          <p className={`text-lg ${parseFloat(assetDetail?.changePercent24Hr) >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
            {parseFloat(assetDetail?.changePercent24Hr) >= 0 ? '▲' : '▼'}
            {' '}{parseFloat(assetDetail?.changePercent24Hr).toFixed(2)}% (24h)
          </p>
          <p className="mt-2">24h VWAP: ${parseFloat(assetDetail?.vwap24Hr).toFixed(2)}</p>
        </Card>
        <Card className="shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Market Information</h2>
          <p>Market Cap: ${(parseFloat(assetDetail?.marketCapUsd) / 1e9).toFixed(2)}B</p>
          <p>24h Volume: ${(parseFloat(assetDetail?.volumeUsd24Hr) / 1e9).toFixed(2)}B</p>
          <p>Market Rank: #{assetDetail?.rank}</p>
        </Card>
      </div>
      <Card className="mt-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Supply Information</h2>
        <p>Circulating Supply: {parseFloat(assetDetail?.supply).toLocaleString()} {assetDetail?.symbol}</p>
        {assetDetail?.maxSupply && (
          <p>Max Supply: {parseFloat(assetDetail?.maxSupply).toLocaleString()} {assetDetail?.symbol}</p>
        )}
      </Card>
      <Card className="mt-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Price History</h2>
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="area"
          height={350}
        />
      </Card>
      <div className="mt-6">
        <a href={assetDetail?.explorer} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          View on Blockchain Explorer
        </a>
      </div>
    </div>
  )
}

export default Detail