"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

interface Employee {
  _id: string;
  employeeId: string;
  name: string;
  role: string;
  designation: string;
}

export default function OrganizationHierarchy() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await api.get("/employees");

      console.log(response.data.data); // Check roles in browser console

      setEmployees(response.data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const normalizeRole = (role: string = "") =>
    role
      .trim()
      .toUpperCase()
      .replace(/\s+/g, "_");

  const superAdmins = employees.filter((emp) => {
    const role = normalizeRole(emp.role);

    return (
      role === "ADMIN" ||
      role === "SUPER_ADMIN"
    );
  });

  const hrManagers = employees.filter((emp) => {
    const role = normalizeRole(emp.role);

    return (
      role === "HR" ||
      role === "HR_MANAGER" ||
      role === "MANAGER"
    );
  });

  const normalEmployees = employees.filter((emp) => {
    const role = normalizeRole(emp.role);

    return role === "EMPLOYEE";
  });

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        Loading hierarchy...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6">
        Organization Hierarchy
      </h2>

      <div className="space-y-4">

        {/* Super Admin */}
        {superAdmins.length > 0 &&
          superAdmins.map((admin) => (
            <div
              key={admin._id}
              className="border rounded-lg p-4 bg-red-50 border-red-200"
            >
              <div className="text-lg font-bold">
                👑 {admin.name}
              </div>

              <div className="text-sm text-gray-600">
                {admin.employeeId}
              </div>

              <div className="text-red-600 font-medium">
                Super Admin
              </div>
            </div>
          ))}

        {/* HR Managers */}
        {hrManagers.length > 0 &&
          hrManagers.map((hr) => (
            <div
              key={hr._id}
              className="ml-10 border rounded-lg p-4 bg-blue-50 border-blue-200"
            >
              <div className="text-lg font-semibold">
                👨‍💼 {hr.name}
              </div>

              <div className="text-sm text-gray-600">
                {hr.employeeId}
              </div>

              <div className="text-blue-600 font-medium">
                HR Manager
              </div>
            </div>
          ))}

        {/* Employees */}
        {normalEmployees.length > 0 &&
          normalEmployees.map((employee) => (
            <div
              key={employee._id}
              className="ml-20 border rounded-lg p-4 bg-green-50 border-green-200"
            >
              <div className="text-lg font-semibold">
                👨‍💻 {employee.name}
              </div>

              <div className="text-sm text-gray-600">
                {employee.employeeId}
              </div>

              <div className="text-green-600 font-medium">
                Employee
              </div>
            </div>
          ))}

        {employees.length === 0 && (
          <div className="text-center text-gray-500 py-6">
            No employees found.
          </div>
        )}
      </div>
    </div>
  );
}