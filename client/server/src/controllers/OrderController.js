const OrderServices = require("../services/OrderService");

const createOrder = async (req, res) => {
  try {
    const {userId } = req.body;
    if ( !userId ) {
      return res.status(200).json({
        status: "ERR",
        message: "Nhập đầy đủ thông tin",
      });
    } else {
      const response = await OrderServices.createOrder(req.body);
      return res.status(200).json(response);
    }
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const getAllOrder = async (req, res) => {
  try {
    const {limit,page}=req.query
    const response = await OrderServices.getAllOrder(Number(limit),Number(page));
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const updateOrder = async (req, res) => {
  try {
    const orderID = req.params.id;
    if (!orderID) {
      return res.status(200).json({
        status: "ERR",
        message: "the orderId is required",
      });
    }
    const response = await OrderServices.updateOrder(orderID, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const getDetailsOrder = async (req, res) => {
  try {
    const orderID = req.params.id;
    if (!orderID) {
      return res.status(200).json({
        status: "ERR",
        message: "the orderID is required",
      });
    }
    const response = await OrderServices.getDetailsOrder(orderID);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const deleteOrder = async (req, res) => {
  try {
    const orderID = req.params.id;
    if (!orderID) {
      return res.status(200).json({
        status: "ERR",
        message: "the orderID is required",
      });
    }
    const response = await OrderServices.deleteOrder(orderID);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
module.exports = {
  createOrder,
  getAllOrder,
  updateOrder,
  deleteOrder,
  getDetailsOrder,
};
