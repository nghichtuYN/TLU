const StudentService = require("../services/StudentService");
const createStudent = async (req, res) => {
  try {
    const { studentCode, fullName, email, mobileNumber, status } = req.body;
    const regEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const isCheckEmail = regEmail.test(email);
    if (!studentCode || !fullName || !email || !mobileNumber || !status) {
      return res.status(200).json({
        status: "ERR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "the input is email",
      });
    }
    const response = await StudentService.createStudent(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const updateStudent = async (req, res) => {
  try {
    const stuId = req.params.id;
    if (!stuId) {
      return res.status(200).json({
        status: "ERR",
        message: "the stuId is required",
      });
    }
    const response = await StudentService.updateStudent(stuId, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const deleteStudent = async (req, res) => {
  try {
    const stuId = req.params.id;
    if (!stuId) {
      return res.status(200).json({
        status: "ERR",
        message: "the StudentID is required",
      });
    }
    const response = await StudentService.deleteStudent(stuId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const getAllStudent = async (req, res) => {
  try {
    const { limit, page } = req.query;
    const response = await StudentService.getAllStudent(
      Number(limit),
      Number(page)
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getDetailsStudent = async (req, res) => {
  try {
    const stuId = req.params.id;
    if (!stuId) {
      return res.status(200).json({
        status: "ERR",
        message: "the stuId is required",
      });
    }
    const response = await StudentService.getDetailsStudent(stuId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
module.exports = {
  createStudent,
  updateStudent,
  deleteStudent,
  getAllStudent,
  getDetailsStudent,
};
