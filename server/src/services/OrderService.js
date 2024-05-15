const Book = require("../models/BookModel");
const Order = require("../models/OrderModel");
const OrderItems = require("../models/OrderItemsModel");

const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { orderItems } = newOrder;
      const createdOrder = await Order.createOrder(newOrder);
      orderItems?.map(async (items) => {
        items.isBorrowed++;
        await Book.updateBookInOrder(items.id, items);
        await OrderItems.createOrderItems(items.id, createdOrder);
      });
      if (createdOrder) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createdOrder,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getAllOrder = (limit, page) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalOrder = await Order.totalOrder();
      const allOrder = await Order.getAllOrder(limit, page);
      resolve({
        status: "OK",
        message: "GET SUCCESS",
        data: allOrder,
        total: totalOrder,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalOrder / limit),
      });
    } catch (error) {
      reject(error);
    }
  });
};
const getFilterOrder = (limit, page, key) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data, total } = await Order.getFilterOrder(limit, page, key);
      resolve({
        status: "OK",
        message: "SUCCESS",
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
const updateOrder = (id, dataUpdate) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkOrder = await Order.getOrderByID(id);
      if (checkOrder === undefined) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      const updatedOrder = await Order.updateOrder(id, dataUpdate);
      resolve({
        status: "OK",
        message: "UPDATE SUCCESS",
        data: updatedOrder,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getDetailsOrder = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.findOne({
        _id: id,
      });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: order,
      });
    } catch (error) {
      reject(error);
    }
  });
};
const deleteOrder = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkOrder = await Order.findOne({
        _id: id,
      });
      if (checkOrder === null) {
        resolve({
          status: "ERR",
          message: "The Order is not defined",
        });
      }
      await Order.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "DELETE SUCCESS",
      });
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createOrder,
  getAllOrder,
  updateOrder,
  deleteOrder,
  getDetailsOrder,
  getFilterOrder,
};
