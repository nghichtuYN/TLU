const express = require("express");
const AuthorControllers=require('../controllers/AuthorController')
const router = express.Router();
router.post('/create-author',AuthorControllers.createAuthor)
router.get('/getAllAuthor',AuthorControllers.getAllAuthor)
router.put('/update-author/:id',AuthorControllers.updateAuthor)
router.delete('/delete-author/:id',AuthorControllers.deleteAuthor)
router.get('/getDetailAuthor/:id',AuthorControllers.getDetailsAuthor)
router.get('/getFilterAuthor/:key',AuthorControllers.getFilterAuthor)
module.exports=router