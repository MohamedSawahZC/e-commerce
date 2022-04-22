//======================= Imports =================================

const express = require("express");
const router = express.Router();
const registerValidator = require("../middleware/User/UserMiddlewareValidatorRegister");
const userController = require("../controllers/UserController");
const loginValidator = require('../middleware/User/UserMiddlewareValidatorLogin')
//======================= Routes  =================================

router.post("/register",registerValidator, userController.register);

router.put('/update/:id', userController.update);

router.get('/:id', userController.getUser);

router.post('/login', loginValidator, userController.login);

router.put('/password/:id', userController.changePassword);

router.put('/email/:id', userController.updateEmail);

module.exports = router;
