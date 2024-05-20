const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { genneralAccessToken } = require("./JwtService");
const getMemberFilter = (limit, page, searchValue) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data, total } = await User.getMemberFilter(
        limit,
        page,
        searchValue
      );
      resolve({
        status: "OK",
        message: "GET SUCCESS",
        data: data,
        total: total.length,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(total.length / limit),
      });
    } catch (error) {
      reject(error);
    }
  });
};
const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { fullName, email, userName, password, isAdmin, mobileNumber } =
      newUser;
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
          mobileNumber,
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
    console.log(userName, password);
    try {
      const checkUser = await User.findOne(userName);
      if (checkUser === undefined) {
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
const checkPassword = (checkData) => {
  return new Promise(async (resolve, reject) => {
    const { id, password } = checkData;
    try {
      const checkUser = await User.getUserByID(id);
      if (checkUser === undefined) {
        resolve({
          status: "ERR",
          message: "Không tồn tại tài khoản này",
        });
      }
      const comaprePassword = bcrypt.compareSync(password, checkUser.password);
      if (!comaprePassword) {
        resolve({
          status: "ERR",
          message: "Password is not correct",
        });
      }
      resolve({
        status: "OK",
        message: "SUCCESS",
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
      const { password, ...rest } = dataUpdate;
      if (checkUser === undefined) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      const comaprePassword = bcrypt.compareSync(password, checkUser.password);
      if (comaprePassword) {
        console.log("istrue", comaprePassword);
        const updatedUser = await User.updateUser(id, {
          password: checkUser.password,
          ...rest,
        });
        resolve({
          status: "OK",
          message: "UPDATE SUCCESS",
          data: updatedUser,
        });
      } else {
        console.log("isFalse", comaprePassword);

        const hash = bcrypt.hashSync(password, 10);
        const updatedUser = await User.updateUser(id, {
          password: hash,
          ...rest,
        });
        resolve({
          status: "OK",
          message: "UPDATE SUCCESS",
          data: updatedUser,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.getUserByID(id);
      if (checkUser === undefined) {
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
const getAllUser = (limit, page) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data, total } = await User.getAllUser(limit, page);
      console.log(total);
      resolve({
        status: "OK",
        message: "GET SUCCESS",
        data: data,
        total: total?.length,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(total?.length / limit),
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
  loginUser,
  deleteUser,
  updateUser,
  getAllUser,
  createUser,
  getDetailsUser,
  checkPassword,
  getMemberFilter,
};
