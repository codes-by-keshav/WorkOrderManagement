import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function AddCertificate() {
  const [certificate, setCertificate] = useState({
    Recipient: '',
    Issuer: '',
    Details: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [addedCertificateId, setAddedCertificateId] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCertificate({ ...certificate, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/add_certificate', certificate);
      console.log('Certificate added:', response.data);
      setAddedCertificateId(response.data.ID);
      setIsSubmitted(true);
      setCertificate({ Recipient: '', Issuer: '', Details: '' });
    } catch (error) {
      console.error('Error adding certificate:', error.response ? error.response.data : error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToDashboard = () => {
    navigate('/admin');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Header />
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">Add Certificate</h2>
      {isSubmitted && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> Certificate has been added successfully.</span>
          {addedCertificateId && (
            <p className="mt-2">Certificate ID: {addedCertificateId}</p>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="Recipient"
          value={certificate.Recipient}
          onChange={handleChange}
          placeholder="Recipient"
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="text"
          name="Issuer"
          value={certificate.Issuer}
          onChange={handleChange}
          placeholder="Issuer"
          className="w-full px-3 py-2 border rounded"
          required
        />
        <textarea
          name="Details"
          value={certificate.Details}
          onChange={handleChange}
          placeholder="Certificate Details"
          className="w-full px-3 py-2 border rounded"
          rows="4"
          required
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className={`w-48 px-4 py-2 rounded ${isLoading ? 'bg-gray-400' : 'bg-primary hover:bg-secondary'} text-white flex items-center justify-center`}
            disabled={isLoading}
          >
            <img src={`${process.env.PUBLIC_URL}/img/certificate-white.png`} alt="Add" className="w-5 h-5 mr-2" />
            {isLoading ? 'Adding...' : 'Add Certificate'}
          </button>
        </div>
      </form>
      <div className="flex justify-center mt-4">
        <button
          onClick={handleBackToDashboard}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 flex items-center"
        >
          <img src={`${process.env.PUBLIC_URL}/img/back.png`} alt="Back" className="w-5 h-5 mr-2" />
          Back to Admin Dashboard
        </button>
      </div>
    </div>
  );
}

export default AddCertificate;
