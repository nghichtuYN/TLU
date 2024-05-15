const express = require("express");
const CategoryControllers=require('../controllers/CategoryControllers')
const router = express.Router();
router.post('/create-cat',CategoryControllers.createCategory)
router.get('/getAllCat',CategoryControllers.getAllCategory)
router.put('/update-cat/:id',CategoryControllers.updateCategory)
router.delete('/delete-cat/:id',CategoryControllers.deleteCategory)
router.get('/getDetailCategory/:id',CategoryControllers.getDetailsCategory)
router.get('/getFilterCategory/:key',CategoryControllers.getFilterCategory)
module.exports=router