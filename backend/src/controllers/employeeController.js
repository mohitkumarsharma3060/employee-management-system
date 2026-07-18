const Employee = require("../models/Employee");

/*
========================================
Create Employee
========================================
*/
exports.createEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      gender,
      dob,
      department,
      designation,
      role,
      employmentType,
      workLocation,
      joiningDate,
      salary,
      status,
    } = req.body;

    // Check duplicate email
    const existingEmployee = await Employee.findOne({
      email,
      isDeleted: false,
    });

    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: "Employee email already exists",
      });
    }

    // Generate Employee ID
    const lastEmployee = await Employee.findOne().sort({
      createdAt: -1,
    });

    let employeeId = "EMP0001";

    if (lastEmployee?.employeeId) {
      const lastNumber = parseInt(
        lastEmployee.employeeId.replace("EMP", "")
      );

      employeeId = `EMP${String(
        lastNumber + 1
      ).padStart(4, "0")}`;
    }

    const employee = await Employee.create({
      employeeId,
      name,
      email,
      phone,
      gender,
      dob,
      department,
      designation,
      role,
      employmentType,
      workLocation,
      joiningDate,
      salary,
      status,
      isDeleted: false,
    });

    return res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: employee,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
========================================
Get All Employees + Search
========================================
*/
exports.getEmployees = async (req, res) => {
  try {
    const search = req.query.search || "";

    const query = {
      isDeleted: false,
    };

    if (search) {
      query.$or = [
        {
          employeeId: {
            $regex: search,
            $options: "i",
          },
        },
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
        {
          phone: {
            $regex: search,
            $options: "i",
          },
        },
        {
          designation: {
            $regex: search,
            $options: "i",
          },
        },
        {
          department: {
            $regex: search,
            $options: "i",
          },
        },
        {
          role: {
            $regex: search,
            $options: "i",
          },
        },
        {
          employmentType: {
            $regex: search,
            $options: "i",
          },
        },
        {
          workLocation: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const employees = await Employee.find(query).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: employees.length,
      data: employees,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
========================================
Get Single Employee
========================================
*/
exports.getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOne({
      _id: req.params.id,
      isDeleted: false,
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
========================================
Update Employee
========================================
*/
exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOne({
      _id: req.params.id,
      isDeleted: false,
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const updatedEmployee =
      await Employee.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: updatedEmployee,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
========================================
Soft Delete Employee
========================================
*/
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOne({
      _id: req.params.id,
      isDeleted: false,
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    employee.isDeleted = true;

    await employee.save();

    return res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};