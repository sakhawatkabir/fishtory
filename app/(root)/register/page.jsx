"use client";
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RegisterPage = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      return;
    }

    setSuccess("Account created! Redirecting to login…");
    setTimeout(() => router.push("/login"), 1500);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <div className="flex items-center justify-center gap-10 py-8">
        <Link href="/login" className="text-2xl font-bold text-gray-500">
          LOGIN
        </Link>
        <Link
          href="/register"
          className="text-2xl font-bold border-b-2 border-black"
        >
          CREATE ACCOUNT
        </Link>
      </div>

      <h4 className="text-center font-medium text-sm text-gray-600 py-2">
        Please fill the information below
      </h4>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded mb-4">
          <AlertCircle size={15} className="shrink-0" />
          {error}
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3 rounded mb-4">
          <CheckCircle2 size={15} className="shrink-0" />
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="first_name"
              className="text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              id="first_name"
              type="text"
              required
              className="w-full px-4 py-2.5 border border-gray-300 focus:border-black focus:outline-none"
              value={form.firstName}
              onChange={set("firstName")}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="last_name"
              className="text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              id="last_name"
              type="text"
              required
              className="w-full px-4 py-2.5 border border-gray-300 focus:border-black focus:outline-none"
              value={form.lastName}
              onChange={set("lastName")}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            className="w-full px-4 py-2.5 border border-gray-300 focus:border-black focus:outline-none"
            value={form.email}
            onChange={set("email")}
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
              type={showPw ? "text" : "password"}
              required
              autoComplete="new-password"
              className="w-full px-4 py-2.5 border border-gray-300 focus:border-black focus:outline-none"
              value={form.password}
              onChange={set("password")}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={() => setShowPw(!showPw)}
            >
              {showPw ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          <p className="text-xs text-gray-400">Minimum 8 characters.</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 font-bold uppercase text-sm bg-black text-white hover:bg-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Creating account…" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
