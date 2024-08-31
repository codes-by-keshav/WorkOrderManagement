import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';

function AdminDashboard() {
  const navigate = useNavigate();

  const adminActions = [
    { name: 'Add Work Order', path: '/admin/add-work-order' },
    { name: 'Add Certificate', path: '/admin/add-certificate' },
    { name: 'Start Auction', path: '/admin/start-auction' },
    { name: 'View Auction', path: '/admin/view-auction' },
    { name: 'Approve Work Order', path: '/admin/approve-work-order' },
    { name: 'View Blockchain', path: '/admin/view-blockchain' },
    { name: 'View Work Orders', path: '/admin/view-work-orders' },
  ];

  const handleLogout = () => {
    // Perform logout actions here (e.g., clear user session, tokens, etc.)
    // Then navigate to the home page
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-primary">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {adminActions.map((action) => (
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

export default AdminDashboard;
