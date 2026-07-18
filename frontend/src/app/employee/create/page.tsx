"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function AddEmployeePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    
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
    
  });

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
        isDeleted: false,
      };

      const { data } = await api.post(
        "/employees",
        payload
      );

      alert("Employee added successfully");

      router.push("/dashboard");
    } catch (error: any) {
      console.log(error);
      alert(
        error?.response?.data?.message ||
          "Failed to create employee"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center">
            Add New Employee
          </h1>
          <p className="text-gray-500 mt-2">
            Fill in the employee details to
            create a new employee record.
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
              value={
                formData.employmentType
              }
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

        

          {/* Button */}
          <div className="md:col-span-2 lg:col-span-3 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold transition"
            >
              {loading
                ? "Creating Employee..."
                : "Create Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}