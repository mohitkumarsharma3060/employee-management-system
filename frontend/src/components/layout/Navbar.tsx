"use client";

import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <header className="h-16 bg-white shadow flex justify-between items-center px-8">
      <h2 className="font-bold text-xl">
        Employee Management System
      </h2>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </header>
  );
}