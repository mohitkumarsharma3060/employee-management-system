import {
  Users,
  UserPlus,
  Building2,
  Clock,
  CalendarDays,
  IndianRupee,
  FileText,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

export default function DashboardHome() {
  const cards = [
    {
      title: "Total Employees",
      value: "125",
      icon: Users,
    },
    {
      title: "New Employees",
      value: "12",
      icon: UserPlus,
    },
    {
      title: "Departments",
      value: "8",
      icon: Building2,
    },
    {
      title: "Employees on Leave",
      value: "7",
      icon: CalendarDays,
    },
  ];

  const actions = [
    {
      title: "Add Employee",
      href: "/dashboard/employees/add",
      color: "bg-blue-600",
    },
    {
      title: "Get All Employees",
      href: "/dashboard/employees",
      color: "bg-green-600",
    },
    {
      title: "Attendance",
      href: "/dashboard/attendance",
      color: "bg-purple-600",
    },
    {
      title: "Payroll",
      href: "/dashboard/payroll",
      color: "bg-orange-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Employee Management Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Manage employees, payroll, attendance and reports.
          </p>
        </div>

        <Link
          href="/dashboard/employees/add"
          className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
        >
          Add Employee
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="bg-white p-6 rounded-xl shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">{card.title}</p>

                  <h2 className="text-3xl font-bold mt-2">
                    {card.value}
                  </h2>
                </div>

                <div className="bg-gray-100 p-3 rounded-lg">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {actions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className={`${action.color} text-white p-5 rounded-lg text-center font-semibold hover:opacity-90`}
            >
              {action.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Link
          href="/dashboard/employees"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg"
        >
          <Users size={40} className="mb-4" />
          <h3 className="font-semibold text-lg">
            Employee Management
          </h3>
          <p className="text-gray-500 mt-2">
            Add, edit, delete and manage employees.
          </p>
        </Link>

        <Link
          href="/dashboard/attendance"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg"
        >
          <Clock size={40} className="mb-4" />
          <h3 className="font-semibold text-lg">
            Attendance
          </h3>
          <p className="text-gray-500 mt-2">
            Track daily attendance records.
          </p>
        </Link>

        <Link
          href="/dashboard/payroll"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg"
        >
          <IndianRupee size={40} className="mb-4" />
          <h3 className="font-semibold text-lg">
            Payroll
          </h3>
          <p className="text-gray-500 mt-2">
            Manage salary and payslips.
          </p>
        </Link>

        <Link
          href="/dashboard/reports"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg"
        >
          <BarChart3 size={40} className="mb-4" />
          <h3 className="font-semibold text-lg">
            Reports
          </h3>
          <p className="text-gray-500 mt-2">
            View employee and company reports.
          </p>
        </Link>
      </div>

      {/* Recent Employees */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-5">
          Recent Employees
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Name</th>
                <th className="text-left py-3">Department</th>
                <th className="text-left py-3">Position</th>
                <th className="text-left py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="py-4">Mohit Sharma</td>
                <td>IT</td>
                <td>Full Stack Developer</td>
                <td>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    Active
                  </span>
                </td>
              </tr>

              <tr className="border-b">
                <td className="py-4">Rahul Kumar</td>
                <td>HR</td>
                <td>HR Executive</td>
                <td>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    Active
                  </span>
                </td>
              </tr>

              <tr>
                <td className="py-4">Ankit Sharma</td>
                <td>Finance</td>
                <td>Accountant</td>
                <td>
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                    On Leave
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}