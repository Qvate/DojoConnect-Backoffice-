import React from "react";

export default function PaymentMethod() {
  return (
    <div>
      <div className="bg-gray-100 rounded-md border-b border-gray-200 px-4 py-2 mb-4">
        <span className="font-semibold text-gray-700 text-lg">Payment method</span>
      </div>
      <div className="bg-white rounded-md shadow p-6 flex items-start">
        <div className="flex justify-center items-center">
          <img src="/users/image11.jpg" alt="card" className="" />
        </div>
        <div>
          <div className="font-semibold text-black text-base">Master Card</div>
          <div className="font-semibold text-black text-base">**** **** **** 4002</div>
          <div className="text-xs text-gray-500 mt-1">Expiry on 20/2024</div>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="mr-1">
              <rect x="3" y="5" width="18" height="14" rx="2" fill="#E5E7EB"/>
              <path d="M3 7l9 6 9-6" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            billing@acme.corp
          </div>
        </div>
      </div>
    </div>
  );
}