const AuthorServices = require("../services/AuthorService");
const createAuthor = async (req, res) => {
  try {
    const { authorName } = req.body;
    if (!authorName) {
      return res.status(200).json({
        status: "ERR",
        message: "Vui long nhap ten sach",
      });
    }
    const response = await AuthorServices.createAuthor(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const getAllAuthor = async (req, res) => {
  try {
    const { limit, page } = req.query;
    const response = await AuthorServices.getAllAuthor(
      Number(limit),
      Number(page)
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const updateAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;

    if (!authorId) {
      return res.status(200).json({
        status: "ERR",
        message: "the authoId is required",
      });
    }
    const response = await AuthorServices.updateAuthor(authorId, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getDetailsAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;
    if (!authorId) {
      return res.status(200).json({
        status: "ERR",
        message: "the authorId is required",
      });
    }
    const response = await AuthorServices.getDetailsAuthor(authorId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const getFilterAuthor = async (req, res) => {
  try {
    const { limit, page } = req.query;
    const key = req.params.key;
    if (!key) {
      return res.status(200).json({
        status: "ERR",
        message: "the key is required",
      });
    }
    const response = await AuthorServices.getFilterAuthor(Number(limit), Number(page),key);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const deleteAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;
    if (!authorId) {
      return res.status(200).json({
        status: "ERR",
        message: "the authorId is required",
      });
    }
    const response = await AuthorServices.deleteAuthor(authorId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
module.exports = {
  createAuthor,
  getAllAuthor,
  updateAuthor,
  deleteAuthor,
  getDetailsAuthor,
  getFilterAuthor,
};
