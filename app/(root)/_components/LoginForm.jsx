"use client"

import { Eye, EyeOff, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";


const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const urlError = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState(
    urlError === "unauthorized"
      ? "You don't have permission to access that page."
      : "",
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError(
        res.error === "CredentialsSignin"
          ? "Invalid email or password."
          : res.error,
      );
      return;
    }

    const meRes = await fetch("/api/auth/session");
    const session = await meRes.json();
    if (session?.user?.role === "ADMIN") {
      router.push("/dashboard");
    } else {
      router.push(callbackUrl);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <div className="flex items-center justify-center gap-10 py-8">
        <Link
          href="/login"
          className="text-2xl font-bold border-b-2 border-black"
        >
          LOGIN
        </Link>
        <Link href="/register" className="text-2xl font-bold text-gray-500">
          CREATE ACCOUNT
        </Link>
      </div>

      <h4 className="text-center font-medium text-sm text-gray-600 py-2">
        Please enter your e-mail and password
      </h4>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded mb-4">
          <AlertCircle size={15} className="shrink-0" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
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
              type={showPw ? "text" : "password"}
              required
              autoComplete="current-password"
              className="w-full px-4 py-2.5 border border-gray-300 focus:border-black focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 font-bold uppercase text-sm bg-black text-white hover:bg-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
