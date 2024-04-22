const BookServices = require("../services/BookService");
const createBook = async (req, res) => {
  try {
    const {  bookName,category_id,authorId,bookImage,ISBNNumber,bookPrice } =
      req.body;
    if (
      !bookName ||
      !category_id ||
      !authorId ||
      !ISBNNumber ||
      !bookPrice||
      !bookImage
    ) {
      return res.status(200).json({
        status: "ERR",
        message: "Nhập đầy đủ thông tin",
      });
    }
    const response = await BookServices.createBook(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const getAllBook = async (req, res) => {
  try {
    const {limit,page}=req.query
    const response = await BookServices.getAllBook(Number(limit),Number(page));
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
        message: "the authoId is required",
      });
    }
    const response = await BookServices.updateBook(bookId, req.body);
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
};
