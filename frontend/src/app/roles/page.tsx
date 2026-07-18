"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import {
  Shield,
  Crown,
  UserCog,
  User,
} from "lucide-react";

interface Employee {
  _id: string;
  employeeId: string;
  name: string;
  email: string;
  designation: string;
  department: string;
  role: string;
  status: string;
}

export default function RolesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/employees");
      setEmployees(res.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const roleConfig = [
    {
      role: "ADMIN",
      title: "Super Admin",
      icon: Crown,
      color: "bg-red-100 text-red-700",
    },
    {
      role: "HR_MANAGER",
      title: "HR Manager",
      icon: UserCog,
      color: "bg-blue-100 text-blue-700",
    },
    {
      role: "EMPLOYEE",
      title: "Employee",
      icon: User,
      color: "bg-green-100 text-green-700",
    },
  ];

  if (loading) {
    return (
      <div className="p-8 text-center text-lg">
        Loading Roles...
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Shield className="w-8 h-8 text-indigo-600" />
        <h1 className="text-3xl font-bold">
          Roles & Permissions
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roleConfig.map((roleItem) => {
          const Icon = roleItem.icon;

          // Filter employees according to role
          const users = employees.filter((emp) => {
            if (roleItem.role === "HR_MANAGER") {
              return (
                emp.role === "HR" ||
                emp.role === "HR_MANAGER" ||
                emp.role === "MANAGER"
              );
            }

            return emp.role === roleItem.role;
          });

          return (
            <div
              key={roleItem.role}
              className="bg-white rounded-xl shadow-lg border overflow-hidden"
            >
              {/* Header */}
              <div className={`${roleItem.color} p-5`}>
                <div className="flex items-center gap-4">
                  <Icon className="w-8 h-8" />

                  <div>
                    <h2 className="text-xl font-bold">
                      {roleItem.title}
                    </h2>

                    <p className="text-sm font-medium">
                      {users.length} Employee(s)
                    </p>
                  </div>
                </div>
              </div>

              {/* Employee List */}
              <div className="p-5">
                {users.length === 0 ? (
                  <div className="text-center text-gray-500 py-6">
                    No employee assigned
                  </div>
                ) : (
                  users.map((user) => (
                    <div
                      key={user._id}
                      className="border rounded-lg p-4 mb-4 hover:shadow-md transition"
                    >
                      <h3 className="font-semibold text-lg">
                        {user.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        ID : {user.employeeId}
                      </p>

                      <p className="text-sm mt-1">
                        <span className="font-medium">
                          Designation:
                        </span>{" "}
                        {user.designation}
                      </p>

                      <p className="text-sm">
                        <span className="font-medium">
                          Department:
                        </span>{" "}
                        {user.department}
                      </p>

                      <p className="text-sm">
                        <span className="font-medium">
                          Role:
                        </span>{" "}
                        {user.role}
                      </p>

                      <span
                        className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold ${
                          user.status === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}