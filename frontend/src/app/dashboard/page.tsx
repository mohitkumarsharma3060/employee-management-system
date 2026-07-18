"use client";
import ProfileMenu from "../profile/page";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Users,
  UserCheck,
  UserX,
  Building2,
  UserPlus,
  GitBranch,
  Search,
  Shield,
} from "lucide-react";

import { useEffect, useState } from "react";
import api from "../../lib/axios";

export default function DashboardPage() {
  const router = useRouter();
  const [employees, setEmployees] = useState<any[]>([]);

useEffect(() => {
  fetchEmployees();
}, []);

const fetchEmployees = async () => {
  try {
    const res = await api.get("/employees");
    setEmployees(res.data.data || []);
  } catch (error) {
    console.log(error);
  }
};

  const stats = [
  {
    title: "Total Employees",
    value: employees.length,
    icon: Users,
    color: "bg-blue-500",
  },
  {
    title: "Active Employees",
    value: employees.filter(
      (emp) => emp.status === "ACTIVE"
    ).length,
    icon: UserCheck,
    color: "bg-green-500",
  },
  {
    title: "Inactive Employees",
    value: employees.filter(
      (emp) => emp.status === "INACTIVE"
    ).length,
    icon: UserX,
    color: "bg-red-500",
  },
  {
    title: "Departments",
    value: [...new Set(employees.map((emp) => emp.department))]
      .filter(Boolean).length,
    icon: Building2,
    color: "bg-purple-500",
  },
];

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");

      localStorage.removeItem("token");
      sessionStorage.clear();

      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold ml-4 mt-2">
  Employee Management Dashboard
</h1>

          <p className="text-gray-500 mt-2 ml-6 ">
            Manage employees, hierarchy, departments and access control.
          </p>
        </div>

       <ProfileMenu />
      </div>

      {/* Statistics */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
  {stats.map((item) => {
    const Icon = item.icon;

    return (
      <div
        key={item.title}
        className="bg-white rounded-xl shadow p-6"
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500">{item.title}</p>

            <h2 className="text-3xl font-bold mt-2">
              {item.value}
            </h2>
          </div>

          <div
            className={`${item.color} p-4 rounded-lg text-white`}
          >
            <Icon size={30} />
          </div>
        </div>
      </div>
    );
  })}
</div>
      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-5">
          Quick Actions
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/employee/create"
            className="border rounded-lg p-5 text-center hover:bg-gray-50 transition"
          >
            <UserPlus className="mx-auto mb-2" />
            Add Employee
          </Link>

          <Link
            href="/employee/get"
            className="border rounded-lg p-5 text-center hover:bg-gray-50 transition"
          >
            <Users className="mx-auto mb-2" />
            All Employees
          </Link> 

          <Link
            href="/organisation"
            className="border rounded-lg p-5 text-center hover:bg-gray-50 transition"
          >
            <GitBranch className="mx-auto mb-2" />
            Org Tree
          </Link>

          <Link
            href="/roles"
            className="border rounded-lg p-5 text-center hover:bg-gray-50 transition"
          >
            <Shield className="mx-auto mb-2" />
            Roles
          </Link>
        </div>
      </div>

     
      {/* Recent Employees */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold">
            Recent Employees
          </h2>

          <Link
            href="/employee/get"
            className="text-blue-600 hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Employee ID</th>
                <th className="text-left py-3">Name</th>
                <th className="text-left py-3">Department</th>
                <th className="text-left py-3">Role</th>
                <th className="text-left py-3">Status</th>
              </tr>
            </thead>

            <tbody>
  {employees.slice(0, 3).map((employee: any) => (
    <tr
      key={employee._id}
      className="border-b hover:bg-gray-50"
    >
      <td className="py-4">{employee.employeeId}</td>

      <td>{employee.name}</td>

      <td>{employee.department}</td>

      <td>
        {employee.role === "SUPER_ADMIN"
          ? "Super Admin"
          : employee.role === "HR_MANAGER"
          ? "HR Manager"
          : "Employee"}
      </td>

      <td>
        <span
          className={`px-2 py-1 rounded text-sm ${
            employee.status === "ACTIVE"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {employee.status}
        </span>
      </td>
    </tr>
  ))}

  {employees.length === 0 && (
    <tr>
      <td
        colSpan={5}
        className="text-center py-6 text-gray-500"
      >
        No employees found.
      </td>
    </tr>
  )}
</tbody>
          </table>
        </div>
      </div>

  {/* Organization Hierarchy */}
<div className="bg-white rounded-xl shadow p-6">
  <h2 className="text-xl font-semibold mb-5">
    Organization Hierarchy
  </h2>

  <div className="space-y-4">
    {(() => {
      const normalizeRole = (role: string = "") =>
        role.trim().toUpperCase().replace(/\s+/g, "_");

      const superAdmins = employees.filter((emp: any) => {
        const role = normalizeRole(emp.role);
        return role === "ADMIN" || role === "SUPER_ADMIN";
      });

      const hrManagers = employees.filter((emp: any) => {
        const role = normalizeRole(emp.role);
        return (
          role === "HR" ||
          role === "HR_MANAGER" ||
          role === "MANAGER"
        );
      });

      const normalEmployees = employees.filter((emp: any) => {
        const role = normalizeRole(emp.role);
        return role === "EMPLOYEE";
      });

      return (
        <>
          {/* Super Admin */}
          {superAdmins.map((emp: any) => (
            <div
              key={emp._id}
              className="border rounded-lg p-4 bg-red-50 border-red-200"
            >
              <div className="font-bold text-lg">
                👑 {emp.name}
              </div>

              <div className="text-sm text-gray-500">
                {emp.employeeId}
              </div>

              <div className="text-red-600 font-medium">
                Super Admin
              </div>
            </div>
          ))}

          {/* HR Manager */}
          {hrManagers.map((emp: any) => (
            <div
              key={emp._id}
              className="ml-10 border rounded-lg p-4 bg-blue-50 border-blue-200"
            >
              <div className="font-semibold text-lg">
                👨‍💼 {emp.name}
              </div>

              <div className="text-sm text-gray-500">
                {emp.employeeId}
              </div>

              <div className="text-blue-600 font-medium">
                HR Manager
              </div>
            </div>
          ))}

          {/* Employees */}
          {normalEmployees.map((emp: any) => (
            <div
              key={emp._id}
              className="ml-20 border rounded-lg p-4 bg-green-50 border-green-200"
            >
              <div className="font-semibold text-lg">
                👨‍💻 {emp.name}
              </div>

              <div className="text-sm text-gray-500">
                {emp.employeeId}
              </div>

              <div className="text-green-600 font-medium">
                Employee
              </div>
            </div>
          ))}

          {employees.length === 0 && (
            <div className="text-center py-6 text-gray-500">
              No employees found.
            </div>
          )}
        </>
      );
    })()}
  </div>
</div>
</div>
  );
}