const Student = require("../models/StudentModel");
const createStudent = (newStudent) => {
  return new Promise(async (resolve, reject) => {
    const { studentCode } = newStudent;
    try {
      const checkStudent = await Student.findOne(studentCode);
      if (checkStudent !== undefined) {
        reject({
          status: "OK",
          message: "The student is exist",
        });
      } else {
        const createdStudent = await Student.createStudent(newStudent);
        if (createdStudent) {
          resolve({
            status: "OK",
            message: "SUCCESS",
            data: createdStudent,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateStudent = (id, dataUpdate) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkStudent = await Student.getStudentByID(id)
      if (checkStudent === undefined) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      const updatedStudent = await Student.updateStudent(id, dataUpdate);
      resolve({
        status: "OK",
        message: "UPDATE SUCCESS",
        data: updatedStudent,
      });
    } catch (error) {
      reject(error);
    }
  });
};
const deleteStudent = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkStudent = await Student.getStudentByID(id);
      if (checkStudent === undefined) {
        resolve({
          status: "ERR",
          message: "The Student is not defined",
        });
      }
      await Student.deleteStudent(id);
      resolve({
        status: "OK",
        message: "DELETE SUCCESS",
      });
    } catch (error) {
      reject(error);
    }
  });
};
const getAllStudent = (limit, page) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalStudent = await Student.totalStudent();
      const allStudent = await Student.getAllStudent(limit,page)
      resolve({
        status: "OK",
        message: "GET SUCCESS",
        data: allStudent,
        total: totalStudent,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalStudent / limit),
      });
    } catch (error) {
      reject(error);
    }
  });
};
const getDetailsStudent = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const student = await Student.getStudentByID(id);
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: student,
      });
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createStudent,
  updateStudent,
  deleteStudent,
  getAllStudent,
  getDetailsStudent,
};
