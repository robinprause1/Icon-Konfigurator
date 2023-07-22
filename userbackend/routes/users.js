const express = require('express');
const controller = require("../controllers/auth.controller.js");
const { verifyToken, checkDuplicateUsername } = require('../middlewares/authJwt.js');
const router = express.Router();


/* Login */
router.post('/login', controller.signin);

/* Register */
router.post('/register',[checkDuplicateUsername], controller.signup);

/* UPDATE a User */
router.patch('/edit', [verifyToken], controller.edit);

/* DELETE a User */
router.patch('/delete',[verifyToken], controller.delete);

module.exports = router;
