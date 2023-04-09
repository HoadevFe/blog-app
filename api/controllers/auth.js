import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = (req, res) => {
  // CHECK EXISTING USER

  const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("User already exists!");

    //HASH THE PASSSWORD AND CREATE A USER

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users(`username`, `email`, `password`) VALUES (?)";

    const values = [req.body.username, req.body.email, hash];

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

export const login = (req, res) => {
  //Check user

  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    //Check password

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );
    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password");

    //JWT id to Cookie
    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};

export const changeUsername = (req, res) => {
  const userId = req.params.id;
  const value = req.body.username;
  const q = "SELECT * FROM users WHERE username= ?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.json(err);

    if (data.length) return res.status(409).json("UserName already exists!");

    const q = "UPDATE users SET `username`=? WHERE `id` = ?";
    db.query(q, [value, userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User name changed success.");
    });
  });
};

export const changePassword = (req, res) => {
  const userId = req.params.id;
  const password = req.body.password;
  const newPassword = req.body.newPassword;
  const q = "SELECT * FROM users WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    const isPasswordCorrect = bcrypt.compareSync(password, data[0].password);
    if (!isPasswordCorrect) return res.status(400).json("Wrong password");
    if (password === newPassword)
      return res.status(403).json("Duplicate old password");
    const salt = bcrypt.genSaltSync(10);
    const hashNewPassword = bcrypt.hashSync(newPassword, salt);

    const q = "UPDATE users SET `password`=? WHERE `id` = ?";
    const value = [hashNewPassword];
    db.query(q, [value, userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Changed Password Succses.");
    });
  });
};
