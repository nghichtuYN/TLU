const express = require("express");
const OrderController=require('../controllers/OrderController')
const router = express.Router();
router.post('/create-order',OrderController.createOrder)
router.get('/getAllOrder',OrderController.getAllOrder)
router.put('/update-order/:id',OrderController.updateOrder)
router.delete('/delete-order/:id',OrderController.deleteOrder)
router.get('/getDetailOrder/:id',OrderController.getDetailsOrder)
module.exports=router