const UserService = require("../services/UserService");
const createUser = async (req, res) => {
  try {
    const { fullName, email, userName, password, confirmPassword ,isAdmin,mobileNumber} = req.body;
    const regEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const isCheckEmail = regEmail.test(email);
    if (!fullName || !email || !userName || !password || !confirmPassword || !isAdmin ||!mobileNumber) {
      return res.status(200).json({
        status: "ERR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "the input is email",
      });
    } else if (password !== confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        message: "the password is confirmPassword",
      });
    }
    const response = await UserService.createUser(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(200).json({
        status: "ERR",
        message: "Vui lòng nhập đầy đủ thông tin !!!",
      });
    }
    const response = await UserService.loginUser(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const getMemberFilter = async (req, res) => {
  try {
    const { limit, page } = req.query;
    const key =req.params?.key
    const response = await UserService.getMemberFilter(Number(limit), Number(page),key);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const checkPassword = async (req, res) => {
  try {
    const { password ,id} = req.body;
    if (!password ||!id) {
      return res.status(200).json({
        status: "ERR",
        message: "Vui lòng nhập đầy đủ thông tin !!!",
      });
    }
    const response = await UserService.checkPassword(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "the userId is required",
      });
    }
    const response = await UserService.updateUser(userId, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "the memberID is required",
      });
    }
    const response = await UserService.deleteUser(userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const getAllUser = async (req, res) => {
  try {
    const { limit, page } = req.query;
    const response = await UserService.getAllUser(Number(limit), Number(page));
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getDetailsUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "the userId is required",
      });
    }
    const response = await UserService.getDetailsUser(userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailsUser,
  checkPassword,
  getMemberFilter
};
