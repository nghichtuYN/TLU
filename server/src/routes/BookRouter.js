const express = require("express");
const BookControllers=require('../controllers/BookController')
const router = express.Router();
router.post('/create-book',BookControllers.createBook)
router.get('/getAllBook',BookControllers.getAllBook)
router.put('/update-book/:id',BookControllers.updateBook)
router.delete('/delete-book/:id',BookControllers.deleteBook)
router.get('/getDetailBook/:id',BookControllers.getDetailsBook)
module.exports=router