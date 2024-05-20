const BookServices = require("../services/BookService");
const createBook = async (req, res) => {
  console.log(req.body)
  try {
    const {
      bookName,
      category_id,
      authorId,
      ISBNNumber,
      bookPrice,
      quantity,
    } = req.body;
    if (
      !bookName ||
      !category_id ||
      !authorId ||
      !ISBNNumber ||
      !bookPrice ||
      !quantity
    ) {
      return res.status(200).json({
        status: "ERR",
        message: "Nhập đầy đủ thông tin",
      });
    }
    const response = await BookServices.createBook(req);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const getAllBook = async (req, res) => {
  try {
    const { limit, page } = req.query;
    const response = await BookServices.getAllBook(Number(limit), Number(page));
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const getBookByCategory = async (req, res) => {
  try {
    console.log(req.query)
    const { limit, page,cat } = req.query;
    console.log(cat)
    const response = await BookServices.getBookByCategory(Number(limit), Number(page),Number(cat));
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const getBookFilter = async (req, res) => {
  try {
    const { limit, page } = req.query;
    const key =req.params?.key
    console.log(key)
    const response = await BookServices.getBookFilter(Number(limit), Number(page),key);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    if (!bookId) {
      return res.status(200).json({
        status: "ERR",
        message: "the bookid is required",
      });
    }
    const response = await BookServices.updateBook(bookId, req);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getDetailsBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    if (!bookId) {
      return res.status(200).json({
        status: "ERR",
        message: "the bookId is required",
      });
    }
    const response = await BookServices.getDetailsBook(bookId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    console.log(bookId)
    if (!bookId) {
      return res.status(200).json({
        status: "ERR",
        message: "the bookId is required",
      });
    }
    const response = await BookServices.deleteBook(bookId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
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
