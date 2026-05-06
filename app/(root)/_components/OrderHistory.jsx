import Link from "next/link";
import React from "react";

const OrderHistory = ({ total }) => {
  return (
    <div className="bg-[#F0EDEB] p-6 space-y-3">
      <div className="flex justify-between items-center">
        <span className="font-medium">Total:</span>
        <span className="text-xl font-bold">£{total.toFixed(2)}</span>
      </div>
      <Link
        href="/checkout"
        className="block w-full bg-black text-white py-3 text-center hover:bg-gray-800 transition-colors cursor-pointer"
      >
        Checkout
      </Link>
    </div>
  );
};

export default OrderHistory;
