import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center max-w-5xl mx-auto">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
            Enterprise Employee Management Platform
          </span>

          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Employee Management
            <span className="text-blue-600"> System</span>
          </h1>

          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            A modern and secure Employee Management System designed to streamline
            workforce operations, employee records, organizational hierarchy,
            role-based access control, and business insights through powerful
            dashboards and analytics.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition"
            >
              Login to Dashboard
            </Link>

            {/* <Link
              href="/dashboard"
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition"
            >
              View Dashboard
            </Link> */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-10">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Core Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-4 text-blue-600">
              Secure Authentication
            </h3>

            <p className="text-gray-600">
              JWT authentication with password encryption using bcrypt and
              protected routes for secure access management.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-4 text-blue-600">
              Role Based Access Control
            </h3>

            <p className="text-gray-600">
              Supports Super Admin, HR Manager, and Employee roles with
              different permissions and access levels.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-4 text-blue-600">
              Employee Management
            </h3>

            <p className="text-gray-600">
              Create, update, search, filter, and manage employee records
              efficiently with an intuitive interface.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-4 text-blue-600">
              Dashboard Analytics
            </h3>

            <p className="text-gray-600">
              View employee statistics, department distribution, active users,
              and organizational insights through interactive dashboards.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-4 text-blue-600">
              Organization Hierarchy
            </h3>

            <p className="text-gray-600">
              Visualize reporting structures and reporting managers using an
              interactive organizational tree.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-4 text-blue-600">
              Advanced Search & Filters
            </h3>

            <p className="text-gray-600">
              Quickly locate employees using search, sorting, filtering, and
              pagination features.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-4xl font-bold text-blue-600">500+</h2>
            <p className="text-gray-600 mt-2">Employees Managed</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-4xl font-bold text-green-600">20+</h2>
            <p className="text-gray-600 mt-2">Departments</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-4xl font-bold text-purple-600">99.9%</h2>
            <p className="text-gray-600 mt-2">System Availability</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-4xl font-bold text-orange-600">24/7</h2>
            <p className="text-gray-600 mt-2">Support & Monitoring</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-10">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold mb-2">
            Employee Management System
          </h3>

          <p className="text-gray-400">
           Built with Next.js, Node.js,
            Express.js and MongoDB
          </p>

          <p className="text-gray-500 mt-4 text-sm">
            © 2026 Employee Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}