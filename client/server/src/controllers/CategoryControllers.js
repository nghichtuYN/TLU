const CategoryServices = require("../services/CategoryService");
const createCategory = async (req, res) => {
  try {
    const { categoryName ,status} = req.body;
    if (!categoryName || !status) {
      return res.status(200).json({
        status: "ERR",
        message: "Vui long nhap ten sach",
      });
    }
    const response = await CategoryServices.createCategory(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const getAllCategory = async (req, res) => {
  try {
    const {limit,page}=req.query
    const response = await CategoryServices.getAllCategory(Number(limit),Number(page));
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const updateCategory = async (req, res) => {
  try {
    const catId = req.params.id;
    if (!catId) {
      return res.status(200).json({
        status: "ERR",
        message: "the authoId is required",
      });
    }
    const response = await CategoryServices.updateCategory(catId, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getDetailsCategory = async (req, res) => {
    try {
      const catId = req.params.id;
      if (!catId) {
        return res.status(200).json({
          status: "ERR",
          message: "the catId is required",
        });
      }
      const response = await CategoryServices.getDetailsCategory(catId);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(404).json({
        message: error,
      });
    }
  };
const deleteCategory = async (req, res) => {
  try {
    const catId = req.params.id;
    if (!catId) {
      return res.status(200).json({
        status: "ERR",
        message: "the catId is required",
      });
    }
    const response = await CategoryServices.deleteCategory(catId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
module.exports = { createCategory, getAllCategory, updateCategory, deleteCategory,getDetailsCategory };
