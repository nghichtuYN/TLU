const express = require("express");
const BookControllers=require('../controllers/BookController')
const uploadMidleware=require('../uploadMiddleware/uploadMiddleware')
const router = express.Router();
router.post('/create-book',uploadMidleware.upload.single('bookImage'),BookControllers.createBook)
router.get('/getAllBook',BookControllers.getAllBook)
router.get('/getBookFilter/:key',BookControllers.getBookFilter)
router.put('/update-book/:id',uploadMidleware.upload.single('bookImage'),BookControllers.updateBook)
router.delete('/delete-book/:id',BookControllers.deleteBook)
router.get('/getDetailBook/:id',BookControllers.getDetailsBook)
router.get('/getBookByCategory',BookControllers.getBookByCategory)
module.exports=router