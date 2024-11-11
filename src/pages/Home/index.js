import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllAsset } from '../../services/store/Assets/actions'
import { Card, Spin } from 'antd'
import { SearchOutlined, StarFilled, StarOutlined } from '@ant-design/icons'
import debounce from 'lodash/debounce';
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [offset, setOffset] = useState(9);
  const [favorites, setFavorites] = useState([]);
  const LIMIT = 9;
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { assets, assetsLoading } = useSelector(state => state.assets)

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('cryptoFavorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cryptoFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchValue) => {
      setOffset(9);
      dispatch(fetchAllAsset({
        search: searchValue,
        limit: LIMIT,
      }));
    }, 300),
    []
  );

  // Handle search input
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  // Load more items
  const handleLoadMore = () => {
    const newOffset = 9 + offset;
    setOffset(newOffset);
    dispatch(fetchAllAsset({
      search: searchTerm,
      limit: newOffset,
    }));
  };

  // Toggle favorite status
  const toggleFavorite = (cryptoId) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(cryptoId)) {
        return prevFavorites.filter(id => id !== cryptoId);
      } else {
        return [...prevFavorites, cryptoId];
      }
    });
  };

  // Fetch initial data
  useEffect(() => {
    dispatch(fetchAllAsset({
      limit: LIMIT,
    }));
  }, [dispatch]);

  // Automatically refresh prices every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchAllAsset({
        search: searchTerm,
        limit: offset,
      }));
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch, searchTerm, offset]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Cryptocurrency Dashboard</h1>

      {/* Search Input */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search cryptocurrencies..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Loading State */}
      {assetsLoading && assets.length === 0 && (
        <div className="flex justify-center items-center my-8">
          <Spin size="large" />
        </div>
      )}

      {/* No Results Message */}
      {!assetsLoading && assets.length === 0 && (
        <div className="text-center text-gray-500 my-8">
          No cryptocurrencies found matching your search.
        </div>
      )}

      {/* Crypto Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets?.map(crypto => (
          <Card
            key={crypto?.id}
            className="overflow-hidden shadow-lg"
            title={
              <div className="flex justify-between items-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4">
                <span>{crypto?.name} ({crypto?.symbol})</span>
                <span className={`text-sm ${parseFloat(crypto?.changePercent24Hr) >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                  {parseFloat(crypto?.changePercent24Hr) >= 0 ? '+' : '-'}
                  {parseFloat(crypto?.changePercent24Hr).toFixed(2)}%
                </span>
              </div>
            }
            extra={
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(crypto?.id);
                }}
                className="text-yellow-400 hover:text-yellow-500 ml-4"
                style={{ fontSize: '24px' }}
              >
                {favorites?.includes(crypto?.id) ? <StarFilled /> : <StarOutlined />}
              </button>
            }
            onClick={() => navigate(`/detail/${crypto?.id}`)}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Price:</span>
              <span className="font-semibold">${parseFloat(crypto?.priceUsd).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Market Cap:</span>
              <span className="font-semibold">${(parseFloat(crypto?.marketCapUsd) / 1e9).toFixed(2)}B</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">24h Volume:</span>
              <span className="font-semibold">${(parseFloat(crypto?.volumeUsd24Hr) / 1e9).toFixed(2)}B</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Supply:</span>
              <span className="font-semibold">{parseFloat(crypto?.supply).toLocaleString()} {crypto?.symbol}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More Button */}
      {!assetsLoading && assets.length > 0 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            {assetsLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>
            ) : (
              'Load More'
            )}
          </button>
        </div>
      )}
    </div>
  );
}
