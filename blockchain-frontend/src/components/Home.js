import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';

function Home({ setUser }) {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow flex items-center bg-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-center mb-8">
            <img src={process.env.PUBLIC_URL + '/img/college.png'} alt="Logo" className="w-full max-w-[175px]" />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-8 text-center">Work Order Management System</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-center mb-4">Admin Login</h2>
              <Login role="admin" setUser={setUser} />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-center mb-4">Vendor Login</h2>
              <Login role="vendor" setUser={setUser} />
            </div>
          </div>
        </div>
      </div>
      <div className="h-1/5 bg-accent flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">Verify Document</h2>
          <Link to="/verify" className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary">
            Verify
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
