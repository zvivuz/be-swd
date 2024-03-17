const router = require("express").Router();
const productController = require("../controller/productController");
const midderwareController = require("../controller/middlewareController");

//GET ALL PRODUCT
router.get("/", productController.getAllProduct);

//GET PRODUCT BY NAME
router.get("/search-by-name", midderwareController.verifyToken, productController.getProductByName);

module.exports = router;
