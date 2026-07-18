"use client";

import { useState } from "react";
import api from "@/lib/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      return setError(
        "Passwords do not match"
      );
    }

    setLoading(true);
    setError("");

    try {
      await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      router.push("/login");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Register to start using the platform
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={submitHandler}>
          <input
            className="border border-gray-300 rounded-lg p-3 w-full mb-4"
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={changeHandler}
            required
          />

          <input
            className="border border-gray-300 rounded-lg p-3 w-full mb-4"
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={changeHandler}
            required
          />

          <input
            className="border border-gray-300 rounded-lg p-3 w-full mb-4"
            type="password"
            name="password"
            placeholder="Password"
            onChange={changeHandler}
            required
          />

          <input
            className="border border-gray-300 rounded-lg p-3 w-full mb-6"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={changeHandler}
            required
          />

          <button
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white w-full p-3 rounded-lg font-semibold"
          >
            {loading
              ? "Creating Account..."
              : "Register"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?
          </p>

          <Link
            href="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login Here
          </Link>
        </div>
      </div>
    </div>
  );
}