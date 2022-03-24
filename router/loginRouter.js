// external imports
const express = require("express");

// internal imports
const { getLogin,login,logout } = require("../controller/loginController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const {doLoginValidators,doLoginValidationHandler } = require('../middlewares/login/loginValidators')
const {redirectLoggedIn} = require('../middlewares/common/checkLogin')

const router = express.Router();

// Set Page title
const page_title = 'Login'

// login page
router.get("/", decorateHtmlResponse('page_title'),redirectLoggedIn, getLogin);

// Login user
router.post('/', decorateHtmlResponse('page_title'),doLoginValidators, doLoginValidationHandler, login)

// Logout
router.delete('/',logout);

module.exports = router;