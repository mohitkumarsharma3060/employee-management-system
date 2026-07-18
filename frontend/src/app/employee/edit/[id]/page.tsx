"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/axios";

interface EmployeeFormData {
  name: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  department: string;
  designation: string;
  role: string;
  employmentType: string;
  workLocation: string;
  joiningDate: string;
  salary: string;
  status: string;
}

const initialFormData: EmployeeFormData = {
  name: "",
  email: "",
  phone: "",
  gender: "",
  dob: "",
  department: "",
  designation: "",
  role: "EMPLOYEE",
  employmentType: "FULL_TIME",
  workLocation: "",
  joiningDate: "",
  salary: "",
  status: "ACTIVE",
};
const toDateInputValue = (value?: string | null) => {
  if (!value) return "";
  return value.length >= 10 ? value.slice(0, 10) : value;
};

export default function EditEmployeePage() {
  const router = useRouter();
  const params = useParams();
  const employeeId = params?.id as string;

  const [loading, setLoading] = useState(false); // submit loading
  const [fetching, setFetching] = useState(true); // initial fetch loading
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [formData, setFormData] =
    useState<EmployeeFormData>(initialFormData);

  // Fetch existing employee details on mount
  useEffect(() => {
    if (!employeeId) return;

    const fetchEmployee = async () => {
      try {
        setFetching(true);
        setFetchError(null);

        const { data } = await api.get(
          `/employees/${employeeId}`
        );

        // Adjust this if your API wraps the employee in { data: {...} }
        const employee = data?.data || data;

        setFormData({
          name: employee.name || "",
          email: employee.email || "",
          phone: employee.phone || "",
          gender: employee.gender || "",
          dob: toDateInputValue(employee.dob),
          department: employee.department || "",
          designation: employee.designation || "",
          role: employee.role || "EMPLOYEE",
          employmentType:
            employee.employmentType || "FULL_TIME",
          workLocation: employee.workLocation || "",
          joiningDate: toDateInputValue(
            employee.joiningDate
          ),
          salary:
            employee.salary !== undefined &&
            employee.salary !== null
              ? String(employee.salary)
              : "",
          status: employee.status || "ACTIVE",
        });
      } catch (error: any) {
        console.log(error);
        setFetchError(
          error?.response?.data?.message ||
            "Failed to load employee details"
        );
      } finally {
        setFetching(false);
      }
    };

    fetchEmployee();
  }, [employeeId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
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

    try {
      setLoading(true);

      const payload = {
        ...formData,
        salary: Number(formData.salary),
      };

      // Use PATCH instead of PUT if your API expects partial updates
      await api.put(
        `/employees/${employeeId}`,
        payload
      );

      alert("Employee updated successfully");

      router.push("/dashboard");
    } catch (error: any) {
      console.log(error);
      alert(
        error?.response?.data?.message ||
          "Failed to update employee"
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-lg">
          Loading employee details...
        </p>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-4">
        <p className="text-red-500 text-lg">
          {fetchError}
        </p>
        <button
          onClick={() => router.back()}
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center">
            Update Employee
          </h1>
          <p className="text-gray-500 mt-2">
            Edit the employee details below and
            save changes.
          </p>
        </div>

        <form
          onSubmit={submitHandler}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {/* Name */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Mohit Sharma"
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="mohit@example.com"
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="9876543210"
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3"
            >
              <option value="">
                Select Gender
              </option>
              <option value="MALE">Male</option>
              <option value="FEMALE">
                Female
              </option>
              <option value="OTHER">
                Other
              </option>
            </select>
          </div>

          {/* DOB */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Department
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3"
            >
              <option value="">
                Select Department
              </option>
              <option value="Engineering">
                Engineering
              </option>
              <option value="HR">HR</option>
              <option value="Sales">
                Sales
              </option>
              <option value="Finance">
                Finance
              </option>
              <option value="Marketing">
                Marketing
              </option>
            </select>
          </div>

          {/* Designation */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Designation
            </label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="Frontend Developer"
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="EMPLOYEE">
                Employee
              </option>
              <option value="MANAGER">
                Manager
              </option>
              <option value="ADMIN">
                Admin
              </option>
            </select>
          </div>

          {/* Employment Type */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Employment Type
            </label>
            <select
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="FULL_TIME">
                Full Time
              </option>
              <option value="PART_TIME">
                Part Time
              </option>
              <option value="CONTRACT">
                Contract
              </option>
              <option value="INTERN">
                Intern
              </option>
            </select>
          </div>

          {/* Work Location */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Work Location
            </label>
            <input
              type="text"
              name="workLocation"
              value={formData.workLocation}
              onChange={handleChange}
              placeholder="Noida"
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Joining Date */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Joining Date
            </label>
            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Salary */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Salary
            </label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="800000"
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="ACTIVE">
                Active
              </option>
              <option value="INACTIVE">
                Inactive
              </option>
              <option value="ON_LEAVE">
                On Leave
              </option>
            </select>
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 lg:col-span-3 mt-4 flex gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-4 rounded-lg font-semibold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold transition disabled:opacity-60"
            >
              {loading
                ? "Updating Employee..."
                : "Update Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}