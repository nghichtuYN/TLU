const Author = require("../models/AuthorModel");
const createAuthor = (newAuthor) => {
  return new Promise(async (resolve, reject) => {
    const { authorName } = newAuthor;
    try {
      const checkAuthor = await Author.findOne(authorName);
      if (checkAuthor !== undefined) {
        reject({
          status: "OK",
          message: "The AuthorName is already",
        });
      } else {
        const createdAuthor = await Author.createAuthor(newAuthor);
        if (createdAuthor) {
          resolve({
            status: "OK",
            message: "SUCCESS",
            data: createdAuthor,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getAllAuthor = (limit, page) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalAth = await Author.totalAuthor();
      const allAuthor = await Author.getAllAuthor(limit, page);
      resolve({
        status: "OK",
        message: "GET SUCCESS",
        data: allAuthor,
        total: totalAth,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalAth / limit),
      });
    } catch (error) {
      reject(error);
    }
  });
};
const updateAuthor = (id, dataUpdate) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkAuthor = await Author.getAuthorByID(id);
      if (checkAuthor === undefined) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      const updatedAuthor = await Author.updateAuthor(id, dataUpdate);
      resolve({
        status: "OK",
        message: "UPDATE SUCCESS",
        data: updatedAuthor,
      });
    } catch (error) {
      reject(error);
    }
  });
};
const getDetailsAuthor = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const author = await Author.getAuthorByID(id);
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: author,
      });
    } catch (error) {
      reject(error);
    }
  });
};
const getFilterAuthor = (limit, page, key) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data, total } = await Author.getFilterAuthor(limit, page, key);
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
const deleteAuthor = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkAuthor = await Author.getAuthorByID(id);
      if (checkAuthor === undefined) {
        resolve({
          status: "ERR",
          message: "The Author is not defined",
        });
      }
      await Author.deleteAuthor(id);
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
  createAuthor,
  getAllAuthor,
  updateAuthor,
  deleteAuthor,
  getDetailsAuthor,
  getFilterAuthor,
};
