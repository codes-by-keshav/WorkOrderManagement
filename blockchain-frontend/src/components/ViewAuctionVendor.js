import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function ViewAuction() {
  const navigate = useNavigate();
  const [auctionId, setAuctionId] = useState('');
  const [auction, setAuction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:8080/view_auction/${auctionId}`);
      setAuction(response.data);
    } catch (error) {
      console.error('Error fetching auction:', error);
      setError('Failed to fetch auction details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToDashboard = () => {
    navigate('/vendor');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Header />
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">View Auction</h2>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={auctionId}
          onChange={(e) => setAuctionId(e.target.value)}
          placeholder="Enter Auction ID"
          className="w-full px-3 py-2 border rounded mb-4"
          required
        />
        <button
          type="submit"
          className="w-full px-4 py-2 rounded bg-primary hover:bg-secondary text-white"
          disabled={isLoading}
        >
          {isLoading ? 'Fetching...' : 'View Auction'}
        </button>
      </form>

      {error && <div className="text-center mt-4 text-red-500">{error}</div>}

      {auction && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <strong className="block text-gray-700 text-sm font-bold mb-2">Auction ID:</strong>
            <p className="text-gray-700">{auction.id}</p>
          </div>
          <div className="mb-4">
            <strong className="block text-gray-700 text-sm font-bold mb-2">Item:</strong>
            <p className="text-gray-700">{auction.item}</p>
          </div>
          <div className="mb-4">
            <strong className="block text-gray-700 text-sm font-bold mb-2">Start Time:</strong>
            <p className="text-gray-700">{new Date(auction.startTime).toLocaleString()}</p>
          </div>
          <div className="mb-4">
            <strong className="block text-gray-700 text-sm font-bold mb-2">End Time:</strong>
            <p className="text-gray-700">{new Date(auction.endTime).toLocaleString()}</p>
          </div>
          <div className="mb-4">
            <strong className="block text-gray-700 text-sm font-bold mb-2">Initial Bid:</strong>
            <p className="text-gray-700">
              ${auction.initialBid.amount} by {auction.initialBid.bidderID} at {new Date(auction.initialBid.time).toLocaleString()}
            </p>
          </div>
          <div className="mb-4">
            <strong className="block text-gray-700 text-sm font-bold mb-2">Subsequent Bids:</strong>
            {auction.subsequentBids.length > 0 ? (
              <ul className="list-disc pl-5">
                {auction.subsequentBids.map((bid, index) => (
                  <li key={index} className="text-gray-700">
                    ${bid.amount} by {bid.bidderID} at {new Date(bid.time).toLocaleString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700">No subsequent bids yet.</p>
            )}
          </div>
        </div>
      )}

      <button
        onClick={handleBackToDashboard}
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Back to Vendor Dashboard
      </button>
    </div>
  );
}

export default ViewAuction;
