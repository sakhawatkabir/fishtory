"use client";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const RegisterPage = () => {
  const [activeTab, setActiveTab] = useState("register");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const handleLoginSubmit = () => {};

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <div className="flex items-center justify-center gap-10 py-8">
        <Link
          href="/login"
          className={`text-2xl font-bold ${
            activeTab === "login" ? "border-b-2 border-black " : "text-gray-500"
          }`}
          onClick={() => setActiveTab("login")}
        >
          LOGIN
        </Link>
        <Link
          href="/register"
          className={`text-2xl font-bold ${
            activeTab === "register"
              ? "border-b-2 border-black -mb-[2px]"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("register")}
        >
          CREATE ACCOUNT
        </Link>
      </div>

      <h4 className="text-center font-medium text-sm text-gray-600 py-2">
        Please fill the information below
      </h4>

      <form onSubmit={handleLoginSubmit} className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="first_name"
            className="text-sm font-medium text-gray-700"
          >
            FirstName
          </label>
          <input
            id="first_name"
            type="text"
            required
            className="w-full px-4 py-2.5 border border-gray-300 focus:border-black focus:outline-none"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="last_name"
            className="text-sm font-medium text-gray-700"
          >
            LastName
          </label>
          <input
            id="last_name"
            type="text"
            required
            className="w-full px-4 py-2.5 border border-gray-300 focus:border-black focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            className="w-full px-4 py-2.5 border border-gray-300 focus:border-black focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showLoginPassword ? "text" : "password"}
              required
              className="w-full px-4 py-2.5 border border-gray-300 focus:border-black focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowLoginPassword(!showLoginPassword)}
            >
              {showLoginPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-700"
            >
              Remember me
            </label>
          </div>

          <a href="#" className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div>
        <div>
          <button
            type="submit"
            className="px-6 py-3 font-bold uppercase text-sm 
                 bg-black text-white hover:bg-gray-800
              transition-colors w-full"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
