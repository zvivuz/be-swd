const Product = require("../model/product");

const productController = {
  getAllProduct: async (req, res) => {
    try {
      const allProduct = await Product.find();
      const count = allProduct.length;
      res.status(200).json({ count, allProduct });
    } catch (error) {
      console.error("Error: ", error);
      res.status(500).json(error);
    }
  },
  getProductByName: async (req, res) => {
    try {
      const searchName = req.query.name;
      if (!searchName) {
        return res.status(400).json({ message: "Name parameter is missing" });
      }
      const products = await Product.find({
        productName: { $regex: searchName, $options: "i" },
      });
      const count = products.length;
      res.status(200).json({ count, products });
    } catch (error) {
      console.error("Error: ", error);
      res.status(500).json(error);
    }
  },
  // getProductByName: async (req, res) => {
  //   try {
  //     const searchName = req.query.name;
  //     if (!searchName) {
  //       return res.status(400).json({ message: "Name parameter is missing" });
  //     }
  //     const products = await Product.aggregate([
  //       {
  //         $match: {
  //           productName: { $regex: searchName, $options: "i" },
  //         },
  //       },
  //     ]);
  //     const count = products.length;
  //     res.status(200).json({ count, products });
  //   } catch (error) {
  //     console.error("Error: ", error);
  //     res.status(500).json(error);
  //   }
  // },
};

module.exports = productController;
