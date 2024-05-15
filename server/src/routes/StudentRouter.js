const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/StudentController");
const authMiddleware = require("../authMiddleware/authMiddleware");
router.post("/create-student", StudentController.createStudent);
router.put("/update-student/:id", StudentController.updateStudent);
router.delete("/delete-student/:id",StudentController.deleteStudent);
router.get("/getAllStudent", StudentController.getAllStudent);
router.get("/get-Studentdetail/:id", StudentController.getDetailsStudent);
router.get("/getFilterStudentByCode/:code", StudentController.getFilterStudentByCode);
module.exports = router;
