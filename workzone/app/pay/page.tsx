import React from 'react';
import Link from 'next/link';

export default function PayPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Zero Studio.X Payments</h1>
        <div className="space-y-4">
          <Link href="/pay/vip" className="block">
            <button className="w-full bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600 transition duration-200">
              VIP Weekly – 150 GHS
            </button>
          </Link>
          <Link href="/pay/pay-after" className="block">
            <button className="w-full bg-green-500 text-white py-3 px-4 rounded hover:bg-green-600 transition duration-200">
              Pay After Winning – 30%
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}