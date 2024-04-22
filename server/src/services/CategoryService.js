const Category = require("../models/CategoryModel");
const createCategory = (newCategory) => {
  return new Promise(async (resolve, reject) => {
    const { categoryName } = newCategory;
    try {
      const checkCategory = await Category.findOne(categoryName);
      if (checkCategory !== undefined) {
        reject({
          status: "ERR",
          message: "The CategoryName is already",
        });
      } else {
        const createdCategory = await Category.createCategory(newCategory)
        if (createdCategory) {
          resolve({
            status: "OK",
            message: "SUCCESS",
            data: createdCategory,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getAllCategory = (limit, page) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalCat = await Category.totalCategory();
      const allCategory = await Category.getAllCategory(limit,page)
      resolve({
        status: "OK",
        message: "GET SUCCESS",
        data: allCategory,
        total: totalCat,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalCat / limit),
      });
    } catch (error) {
      reject(error);
    }
  });
};
const updateCategory = (id, dataUpdate) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkCategory = await Category.getCategoryByID(id);
      if (checkCategory === undefined) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      const updatedCategory = await Category.updateCategory(id, dataUpdate);
      resolve({
        status: "OK",
        message: "UPDATE SUCCESS",
        data: updatedCategory,
      });
    } catch (error) {
      reject(error);
    }
  });
};
const getDetailsCategory = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cat = await Category.getCategoryByID(id);
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: cat,
      });
    } catch (error) {
      reject(error);
    }
  });
};
const deleteCategory = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkCategory = await Category.getCategoryByID(id)
      if (checkCategory === undefined) {
        resolve({
          status: "ERR",
          message: "The Category is not defined",
        });
      }
      await Category.deleteCategory(id);
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
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
  getDetailsCategory,
};
