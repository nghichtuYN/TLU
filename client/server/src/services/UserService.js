const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService");
// const createStudent = (newStudent) => {
//   return new Promise(async (resolve, reject) => {
//     const { studentCode, fullName, email, mobileNumber } = newStudent;
//     try {
//       const createdStudent = await Student.create({
//         studentCode,
//         fullName,
//         email,
//         mobileNumber,
//       });
//       if (createdStudent) {
//         resolve({
//           status: "OK",
//           message: "SUCCESS",
//           data: createdStudent,
//         });
//       }
//     } catch (error) {
//       reject(error);
//     }
//   });
// };
const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { fullName, email, userName, password, isAdmin } = newUser;
    try {
      const checkMember = await User.findOne(userName);
      if (checkMember !== undefined) {
        resolve({
          status: "OK",
          message: "The user name is exsit",
        });
      } else {
        const hash = bcrypt.hashSync(password, 10);
        const createdMember = await User.createUser({
          fullName,
          email,
          userName,
          password: hash,
          isAdmin,
        });
        if (createdMember) {
          resolve({
            status: "OK",
            message: "SUCCESS",
            data: createdMember,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
const loginUser = (loginUser) => {
  return new Promise(async (resolve, reject) => {
    const { userName, password } = loginUser;
    try {
      const checkUser = await User.findOne(userName);
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "Không tồn tại tài khoản này",
        });
      }
      const comaprePassword = bcrypt.compareSync(password, checkUser.password);
      if (!comaprePassword) {
        resolve({
          status: "ERR",
          message: "Mật khẩu hoặc tài khoản không chính xác",
        });
      }
      const access_token = await genneralAccessToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });
      resolve({
        status: "OK",
        message: "LOGIN SUCCESS",
        access_token,
      });
    } catch (error) {
      reject(error);
    }
  });
};
const updateUser = (id, dataUpdate) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.getUserByID(id);
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      const updatedUser = await User.updateUser(id, dataUpdate);
      resolve({
        status: "OK",
        message: "UPDATE SUCCESS",
        data: updatedUser,
      });
    } catch (error) {
      reject(error);
    }
  });
};
const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.getUserByID(id);
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The member is not defined",
        });
      }
      await User.deleteUser(id);
      resolve({
        status: "OK",
        message: "DELETE SUCCESS",
      });
    } catch (error) {
      reject(error);
    }
  });
};
const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allMemeber = await User.getAllUser();
      resolve({
        status: "OK",
        message: "GET SUCCESS",
        data: { ...allMemeber },
      });
    } catch (error) {
      reject(error);
    }
  });
};
const getDetailsUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.getUserByID(id);
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: user,
      });
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  // createStudent,
  // createMember,
  // loginAdmin,
  // updateMember,
  // deleteMember,
  loginUser,
  deleteUser,
  updateUser,
  getAllUser,
  createUser,
  getDetailsUser,
};
