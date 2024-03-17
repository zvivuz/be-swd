const Account = require("../model/account");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { token } = require("morgan");

const authenController = {
  generateAccessToken: (account) => {
    return jwt.sign({ accountId: account._id }, "your_secret_key", {
      expiresIn: "6m",
    });
  },
  genarateRefreshToken: (account) => {
    return jwt.sign({ accountId: account._id }, "your_refresh_key", {
      expiresIn: "365d",
    });
  },
  register: async (req, res) => {
    try {
      const existingUser = await Account.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newAccount = new Account({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

      const savedAccount = await newAccount.save();

      res.status(200).json(savedAccount);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const account = await Account.findOne({ email });
      // Kiểm tra xem người dùng có tồn tại không
      if (!account) {
        return res.status(404).json({
          success: false,
          message: "Email or password is incorrect",
        });
      }
      // Kiểm tra mật khẩu
      const isPasswordValid = await bcrypt.compare(password, account.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Email or password is incorrect",
        });
      }
      if (account && isPasswordValid) {
        // Tạo mã thông báo JWT
        const token = authenController.generateAccessToken(account);
        res.status(200).json({ token, account, message: "Login successful" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};

module.exports = authenController;
