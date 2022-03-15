// external imports
const express = require("express");

// internal imports
const { getLogin,login } = require("../controller/loginController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const {doLoginValidators,doLoginValidationHandler } = require('../middlewares/login/loginValidators')

const router = express.Router();

// Set Page title
const page_title = 'Login'

// login page
router.get("/", decorateHtmlResponse('page_title'), getLogin);

// Login user
router.post('/', decorateHtmlResponse('page_title'),doLoginValidators, doLoginValidationHandler, login)

module.exports = router;