'use client';

import React, { useState } from 'react';

export default function PayAfterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    winningAmount: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const paymentAmount = parseFloat(formData.winningAmount) * 0.3;
    console.log('Form submitted:', { ...formData, paymentAmount });
    // TODO: Integrate with Paystack payment processing
  };

  const paymentAmount = formData.winningAmount ? (parseFloat(formData.winningAmount) * 0.3).toFixed(2) : '0.00';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Pay After Winning</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="winningAmount" className="block text-sm font-medium text-gray-700 mb-1">
              Winning Amount (GHS)
            </label>
            <input
              type="number"
              id="winningAmount"
              name="winningAmount"
              value={formData.winningAmount}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>Payment Amount:</strong> {paymentAmount} GHS (30% of winnings)
            </p>
          </div>

          <div className="bg-yellow-50 p-3 rounded-md">
            <p className="text-sm text-yellow-800">
              Minimum stake allowed: 20 GHS
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 px-4 rounded hover:bg-green-600 transition duration-200 font-medium"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}