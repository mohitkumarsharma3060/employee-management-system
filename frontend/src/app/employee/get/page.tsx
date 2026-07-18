"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Pencil, Trash2, Search, UserPlus } from "lucide-react";

type Employee = {
  _id: string;
  employeeId?: string;
  name?: string;
  email?: string;
  phone?: string;
  department?: string;
  designation?: string;
  salary?: number | string;
  role?: string;
  status?: string;
};

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000/api";

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/employees`
      );

      setEmployees(response.data.data || []);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmed) return;

    try {
      await axios.delete(`${API_URL}/employees/${id}`);

      setEmployees((prev) => prev.filter((emp) => emp._id !== id));

      alert("Employee deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to delete employee");
    }
  };

  const filteredEmployees = useMemo(() => {
    if (!searchTerm) return employees;

    const term = searchTerm.toLowerCase();

    return employees.filter((emp) => {
      return (
        emp.employeeId
          ?.toLowerCase()
          .includes(term) ||
        emp.name?.toLowerCase().includes(term) ||
        emp.email?.toLowerCase().includes(term) ||
        emp.phone?.toLowerCase().includes(term) ||
        emp.department
          ?.toLowerCase()
          .includes(term) ||
        emp.designation
          ?.toLowerCase()
          .includes(term) ||
        emp.role?.toLowerCase().includes(term) ||
        emp.status?.toLowerCase().includes(term)
      );
    });
  }, [employees, searchTerm]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">
          Employee Management
        </h1>

        <Link
          href="/dashboard/employees/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg flex items-center gap-2 w-fit"
        >
          <UserPlus size={18} />
          Add Employee
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search
          className="absolute left-3 top-3 text-gray-400"
          size={20}
        />

        <input
          type="text"
          placeholder="Search by employee id, name, email, phone, department, designation..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="w-full border rounded-lg pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-4 text-left">
                Employee ID
              </th>
              <th className="px-4 py-4 text-left">
                Name
              </th>
              <th className="px-4 py-4 text-left">
                Email
              </th>
              <th className="px-4 py-4 text-left">
                Phone
              </th>
              <th className="px-4 py-4 text-left">
                Department
              </th>
              <th className="px-4 py-4 text-left">
                Designation
              </th>
              <th className="px-4 py-4 text-left">
                Salary
              </th>
              <th className="px-4 py-4 text-left">
                Status
              </th>
              <th className="px-4 py-4 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={9}
                  className="text-center py-10"
                >
                  Loading employees...
                </td>
              </tr>
            ) : filteredEmployees.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="text-center py-10 text-gray-500"
                >
                  No employees found
                </td>
              </tr>
            ) : (
              filteredEmployees.map((employee: Employee) => (
                <tr
                  key={employee._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-4 font-semibold">
                    {employee.employeeId}
                  </td>

                  <td className="px-4 py-4">
                    {employee.name}
                  </td>

                  <td className="px-4 py-4">
                    {employee.email}
                  </td>

                  <td className="px-4 py-4">
                    {employee.phone}
                  </td>

                  <td className="px-4 py-4">
                    {employee.department}
                  </td>

                  <td className="px-4 py-4">
                    {employee.designation}
                  </td>

                  <td className="px-4 py-4">
                    ₹
                    {Number(
                      employee.salary || 0
                    ).toLocaleString("en-IN")}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        employee.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex justify-center gap-2">
                      <Link 
                        href={`/employee/edit/${employee._id}`}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg"
                      >
                        <Pencil size={18} />
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete(employee._id)
                        }
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}