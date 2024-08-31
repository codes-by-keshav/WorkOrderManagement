import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';

function VendorDashboard() {
  const navigate = useNavigate();

  const vendorActions = [
    { name: 'Participate in Auction', path: '/vendor/participate-auction' },
    { name: 'View Auction', path: '/vendor/view-auction' },
  ];

  const handleLogout = () => {
    // Perform logout logic here (e.g., clear local storage, reset state)
    // Then navigate to the login page
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-primary">Vendor Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {vendorActions.map((action) => (
          <Link
            key={action.name}
            to={action.path}
            className="bg-white p-6 rounded-lg shadow-md hover:bg-accent"
          >
            <h2 className="text-2xl font-semibold text-primary">{action.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default VendorDashboard;
