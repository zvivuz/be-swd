const router = require("express").Router();
const authenController = require("../controller/authenController");

//REGISTER
router.post("/register", authenController.register);

//LOGIN
router.get("/login", authenController.login);
module.exports = router;
