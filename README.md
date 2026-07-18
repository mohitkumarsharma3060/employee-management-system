# Employee Management System

A Full Stack Employee Management System built as a hiring assignment using Next.js, Node.js, Express.js, and MongoDB. The application provides secure authentication, role-based access control, employee management, organizational hierarchy, and a responsive dashboard.

---

## Features

### Authentication

- JWT Authentication
- Secure Login & Logout
- Password Hashing using bcrypt
- Protected Routes

### Role Based Access Control

#### Super Admin

- Full Dashboard Access
- Create Employee
- Update Employee
- Delete Employee
- Assign Roles
- Assign Reporting Managers
- View Organization Hierarchy

#### HR Manager

- Create Employees
- Update Employees
- View Employees
- Assign Reporting Managers
- Cannot Delete Employees
- Cannot Assign Super Admin Role

#### Employee

- View Own Profile
- Update Limited Profile Information

---

## Dashboard

- Total Employees
- Active Employees
- Inactive Employees
- Department Count

---

## Employee Management

- Add Employee
- Update Employee
- Delete Employee
- Employee Details
- Employee Profile Image
- Reporting Manager
- Department Management

Employee Fields

- Employee ID
- Name
- Email
- Phone
- Department
- Designation
- Salary
- Joining Date
- Status
- Role
- Reporting Manager
- Profile Image

---

## Organization Hierarchy

- Reporting Manager Assignment
- Organization Tree
- Direct Reports
- Circular Reporting Prevention

---

## Search, Filter & Sorting

### Search

- Employee Name
- Email
- Mobile no
- department



### Sorting

- Name
- Joining Date

---

## Validation

Frontend Validation

- Required Fields
- Email Validation
- Phone Validation
- Salary Validation

Backend Validation

- JWT Authentication
- Request Validation
- Duplicate Email Check
- Employee ID Validation

---

## Tech Stack

### Frontend

- Next.js
- React.js
- TypeScript
- Tailwind CSS
- Axios
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

---

## Project Structure

```
employee-management-system
│
├── backend
├──   src
│      ├── config
│      ├── controllers
│      ├── middleware
│      ├── models
│      ├── routes
│      ├── utils
│      ├── package.json
│      └── server.js
│
├── frontend
├── src
│   ├── app
│   ├── components
│   ├── context
│   ├── lib
│   └── package.json
│
├── README.md
└── screenshots
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/employee-management-system.git
```

---

### Backend

```bash
cd backend

npm install

npm run dev
```

Runs on

```
http://localhost:5000
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Runs on

```
http://localhost:3000
```

---

## Environment Variables

### Backend (.env)

```
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key
```

### Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

# API Endpoints

## Authentication

### Login

```
POST /api/auth/login
```

### Logout

```
POST /api/auth/logout
```

### Get Profile

```
GET /api/auth/profile
```

---

## Employee

### Get Employees

```
GET /api/employees
```

### Get Employee By ID

```
GET /api/employees/:id
```

### Create Employee

```
POST /api/employees
```

### Update Employee

```
PUT /api/employees/:id
```

### Delete Employee

```
DELETE /api/employees/:id
```

---

## Organization

### Tree

```
GET /api/organization
```


---



Include

- Login Page
- Dashboard
- Employee List
- Add Employee
- Edit Employee
- Organization Tree
- Roles
- Profile

---

## Bonus Features

- Pagination
- Dashboard Statistics
- Responsive Design
- Protected Routes
- Soft Delete
- Profile Management



## Author

Mohit Kumar Sharma

Full Stack Developer

Email:
mohitkumarsharma3060@gmail.com

GitHub:
https://github.com/mohitkumarsharma3060dev

LinkedIn:
https://linkedin.com/in/mohitkumarsharmadev# employee-management-system
