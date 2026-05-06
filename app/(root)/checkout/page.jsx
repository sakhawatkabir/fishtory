"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  MapPin,
  Truck,
  Zap,
  Clock,
  CheckCircle,
  Plus,
} from "lucide-react";
import Breadcrumbs from "../_components/Breadcrumbs";
import SectionTitle from "../_components/SectionTitle";

const deliveryMethods = [
  {
    id: "standard",
    label: "Standard Delivery",
    description: "3–5 business days",
    price: 3.99,
    icon: Truck,
  },
  {
    id: "express",
    label: "Express Delivery",
    description: "Next business day",
    price: 7.99,
    icon: Zap,
  },
  {
    id: "sameday",
    label: "Same Day Delivery",
    description: "Order before 12pm",
    price: 12.99,
    icon: Clock,
  },
];

const savedAddresses = [
  {
    id: 1,
    fullName: "James Whitfield",
    address: "12 Baker Street, London, NW1 6XE",
    phone: "+44 7700 900123",
    isDefault: true,
  },
  {
    id: 2,
    fullName: "James Whitfield",
    address: "7 Oak Avenue, Flat 3, Manchester, M1 2AB",
    phone: "+44 7700 900456",
    isDefault: false,
  },
];

const orderItems = [
  {
    id: 1,
    name: "Sea Sisters Mussels with Chilli & Garlic",
    price: 10,
    quantity: 1,
    image: "/images/image1.jpg",
  },
  {
    id: 2,
    name: "Sea Sisters Mussels with Lemon & Herb",
    price: 12,
    quantity: 2,
    image: "/images/img5.webp",
  },
];

const CheckoutPage = () => {
  const [selectedAddress, setSelectedAddress] = useState(savedAddresses[0].id);
  const [selectedMethod, setSelectedMethod] = useState("standard");
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    address: "",
    phone: "",
  });

  const subtotal = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const deliveryCost =
    deliveryMethods.find((m) => m.id === selectedMethod)?.price ?? 0;
  const total = subtotal + deliveryCost;

  const handleChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto px-4 py-5">
      <Breadcrumbs title="Checkout" />
      <SectionTitle title="checkout" />

      <div className="flex flex-col lg:flex-row gap-8 pb-12">
        {/* ── Left column ── */}
        <div className="lg:w-2/3 space-y-8">
          {/* Delivery address */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-widest mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Delivery Address
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {savedAddresses.map((addr) => (
                <button
                  key={addr.id}
                  onClick={() => setSelectedAddress(addr.id)}
                  className={`text-left p-4 border transition-colors cursor-pointer ${
                    selectedAddress === addr.id
                      ? "border-black bg-[#F0EDEB]"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-sm">{addr.fullName}</p>
                      <p className="text-gray-600 text-sm mt-1">
                        {addr.address}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">{addr.phone}</p>
                    </div>
                    {selectedAddress === addr.id && (
                      <CheckCircle className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                    )}
                  </div>
                  {addr.isDefault && (
                    <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                      Default
                    </span>
                  )}
                </button>
              ))}

              {/* Add new address toggle */}
              <button
                onClick={() => setShowNewAddressForm(!showNewAddressForm)}
                className="border border-dashed border-gray-300 p-4 flex items-center justify-center gap-2 text-sm text-gray-500 hover:border-gray-500 hover:text-black transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add new address
              </button>
            </div>

            {/* New address form */}
            {showNewAddressForm && (
              <div className="mt-4 border border-gray-200 p-5 space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-widest">
                  New Address
                </h3>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={newAddress.fullName}
                    onChange={handleChange}
                    placeholder="James Whitfield"
                    className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={newAddress.address}
                    onChange={handleChange}
                    placeholder="12 Baker Street, London, NW1 6XE"
                    className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={newAddress.phone}
                    onChange={handleChange}
                    placeholder="+44 7700 900123"
                    className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div className="flex gap-3 pt-1">
                  <button
                    onClick={() => setShowNewAddressForm(false)}
                    className="flex-1 border border-black py-2 text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Save Address
                  </button>
                  <button
                    onClick={() => setShowNewAddressForm(false)}
                    className="px-4 py-2 text-sm text-gray-500 hover:text-black transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Delivery method */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-widest mb-4 flex items-center gap-2">
              <Truck className="w-4 h-4" />
              Delivery Method
            </h2>

            <div className="space-y-3">
              {deliveryMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full text-left flex items-center justify-between p-4 border transition-colors cursor-pointer ${
                      selectedMethod === method.id
                        ? "border-black bg-[#F0EDEB]"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm">{method.label}</p>
                        <p className="text-gray-500 text-xs">
                          {method.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-sm">
                        £{method.price.toFixed(2)}
                      </span>
                      {selectedMethod === method.id && (
                        <CheckCircle className="w-5 h-5 text-black" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Delivery note */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-widest mb-4">
              Delivery Note{" "}
              <span className="text-gray-400 font-normal normal-case tracking-normal">
                (optional)
              </span>
            </h2>
            <textarea
              rows={3}
              placeholder="E.g. Leave with neighbour, ring doorbell twice…"
              className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors resize-none"
            />
          </section>
        </div>

        {/* ── Right column – Order summary ── */}
        <div className="lg:w-1/3">
          <div className="bg-[#F0EDEB] p-6 space-y-5 sticky top-4">
            <h2 className="text-sm font-semibold uppercase tracking-widest">
              Order Summary
            </h2>

            <ul className="space-y-3">
              {orderItems.map((item) => (
                <li key={item.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 flex-shrink-0 overflow-hidden bg-white">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium leading-tight line-clamp-2">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="text-sm font-medium flex-shrink-0">
                    £{(item.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="border-t border-gray-300 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span>£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery</span>
                <span>£{deliveryCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-300">
                <span>Total</span>
                <span>£{total.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-black text-white py-3 text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer flex items-center justify-center gap-2">
              Continue to Payment
              <ChevronRight className="w-4 h-4" />
            </button>

            <Link
              href="/cart"
              className="block text-center text-sm text-gray-500 hover:text-black transition-colors"
            >
              ← Back to bag
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
