const Book = require("../models/BookModel");
const OrderItems = require("../models/OrderItemsModel");
const Order=require("../models/OrderModel")
const createBook = (newBook) => {
  return new Promise(async (resolve, reject) => {
    const { bookName } = newBook.body;
    try {
      const checkBook = await Book.findOne(bookName);
      if (checkBook !== undefined) {
        reject({
          status: "OK",
          message: "The BookName is already",
        });
      } else {
        const createdBook = await Book.createBook(newBook);
        if (createdBook) {
          resolve({
            status: "OK",
            message: "SUCCESS",
            data: createdBook,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getAllBook = (limit, page) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalBook = await Book.totalBook();
      const allBook = await Book.getAllBook(limit,page)
      resolve({
        status: "OK",
        message: "GET SUCCESS",
        data: allBook,
        total: totalBook,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalBook / limit),
      });
    } catch (error) {
      reject(error);
    }
  });
};
const getBookByCategory = (limit, page,catId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {data,total} = await Book.getBookByCategory(limit,page,catId)
      resolve({
        status: "OK",
        message: "GET SUCCESS",
        data: data,
        total: total,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(total / limit),
      });
    } catch (error) {
      reject(error);
    }
  });
};
const getBookFilter = (limit, page,searchValue) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {data,total} = await Book.getBookFilter(limit,page,searchValue) 
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
const updateBook = (id, dataUpdate) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkBook = await Book.getBookByID(id);
      if (checkBook === undefined) {
        resolve({
          status: "ERR",
          message: "The book is not defined",
        });
      }
      const updatedBook = await Book.updateBook(id, dataUpdate)
      resolve({
        status: "OK",
        message: "UPDATE SUCCESS",
        data: updatedBook,
      });
    } catch (error) {
      reject(error);
    }
  });
};
const getDetailsBook = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const book = await Book.getBookByID(id);
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: book,
      });
    } catch (error) {
      reject(error);
    }
  });
};
const deleteBook = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkBook = await Book.getBookByID(id);
      if (checkBook === undefined) {
        resolve({
          status: "ERR",
          message: "The Book is not defined",
        });
      }
      const orderId =await OrderItems.deleteOrderItemsByBookId(id)
      orderId?.map(async(order)=>{
        await Order.deleteOrderByOrderItems(order?.orderId)
      })
      await Book.deleteBook(id);
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
  createBook,
  getAllBook,
  updateBook,
  deleteBook,
  getDetailsBook,
  getBookFilter,
  getBookByCategory
};
