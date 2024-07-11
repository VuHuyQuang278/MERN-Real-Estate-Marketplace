import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  // Băm password
  const hashedPassword = bcryptjs.hashSync(password, 10);
  // Tạo user mới từ mật khẩu đã băm
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    // Lưu vào database và gửi phản hồi
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Kiểm tra tính hợp lệ của email
    const validUser = await User.findOne({ email: email });
    // Nếu email không hợp lệ thì trả về lỗi
    if (!validUser) return next(errorHandler(404, "User not found!"));
    // Kiểm tra tính hợp lệ của password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    // Nếu password không hợp lệ thì trả về lỗi
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    // Tạo token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    // Loại bỏ password khỏi thông tin user
    const { password: pass, ...rest } = validUser._doc;
    // Gửi cookie và thông tin người dùng
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
