"use client";

import Link from "next/link";
import {
  FaUsers,
  FaChartBar,
  FaSitemap,
  FaUser,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white p-5">
      <h1 className="text-2xl font-bold mb-10">
        EMS
      </h1>

      <ul className="space-y-4">
        <li>
          <Link
            href="/dashboard"
            className="flex gap-3 items-center"
          >
            <FaChartBar />
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            href="/employees"
            className="flex gap-3 items-center"
          >
            <FaUsers />
            Employees
          </Link>
        </li>

        <li>
          <Link
            href="/organization"
            className="flex gap-3 items-center"
          >
            <FaSitemap />
            Organization
          </Link>
        </li>

        <li>
          <Link
            href="/profile"
            className="flex gap-3 items-center"
          >
            <FaUser />
            Profile
          </Link>
        </li>
      </ul>
    </aside>
  );
}