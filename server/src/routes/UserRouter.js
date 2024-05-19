const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserControllers");
const authMiddleware = require("../authMiddleware/authMiddleware");
router.post("/sign-up", UserController.createUser);
router.post("/sign-in", UserController.loginUser);
router.post("/checkPassword", UserController.checkPassword);
router.put("/update-user/:id", UserController.updateUser);
router.delete("/delete-user/:id", UserController.deleteUser);
router.get("/getAllUser",UserController.getAllUser)
router.get('/getMemberFilter/:key',UserController.getMemberFilter)
router.get('/get-detail/:id',UserController.getDetailsUser)
module.exports = router;
