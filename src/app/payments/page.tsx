"use client";
import React from 'react';
import { MaxWidthWrapper } from '@/components';

const PaymentsPage = () => {
  return (
    <MaxWidthWrapper>
      <div className="min-h-screen p-6">
        <h1 className="text-2xl font-bold mb-4">Payments</h1>
        <div className="bg-white rounded-lg shadow p-6">
          {/* Add your payments content here */}
          <p>Payments page content will go here</p>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default PaymentsPage;
