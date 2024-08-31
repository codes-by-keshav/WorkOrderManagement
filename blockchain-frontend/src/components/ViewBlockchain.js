import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';


function ViewBlockchain() {
  const [blockchain, setBlockchain] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlockchain();
  }, []);

  const fetchBlockchain = async () => {
    try {
      const response = await axios.get('http://localhost:8080/view_blockchain');
      setBlockchain(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching blockchain:', error);
      setIsLoading(false);
    }
  };

  const handleBackToDashboard = () => {
    navigate('/admin');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
  };

  const renderBlockData = (block, index) => {
    if (index === 0) {
      return <p>Genesis Block</p>;
    }

    try {
      const data = JSON.parse(block.data);
      return (
        <>
          <p><strong>ID:</strong> {data.ID}</p>
          <p><strong>Issuer:</strong> {data.Issuer}</p>
          <p><strong>Date:</strong> {formatDate(data.Date)}</p>
          <p><strong>Details:</strong> {data.Details || data.Circular}</p>
        </>
      );
    } catch (error) {
      return <p>Error parsing block data</p>;
    }
  };

  if (isLoading) {
    return <div className="text-center mt-8">Loading blockchain data...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
    <Header />
    <button 
        onClick={handleBackToDashboard}
        className="mt-6 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Back to Admin Dashboard
      </button>
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">Blockchain</h2>
      {blockchain.length === 0 ? (
        <p className="text-center">No blockchain data found.</p>
      ) : (
        <div className="space-y-6">
          {blockchain.map((block, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Block #{index}</h3>
              <p><strong>Hash:</strong> {block.hash}</p>
              <p><strong>Previous Hash:</strong> {block.prev_block_hash || 'N/A'}</p>
              <p><strong>Timestamp:</strong> {new Date(block.timestamp * 1000).toLocaleString()}</p>
              <div className="mt-4">
                <h4 className="font-semibold">Block Data:</h4>
                {renderBlockData(block, index)}
              </div>
            </div>
          ))}
        </div>
      )}
      <button 
        onClick={handleBackToDashboard}
        className="mt-6 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Back to Admin Dashboard
      </button>
    </div>
  );
}

export default ViewBlockchain;
