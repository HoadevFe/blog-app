import express from "express";
import {
  login,
  logout,
  register,
  changeUsername,
  changePassword,
} from "../controllers/auth.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.put("/username/:id", changeUsername);
router.put("/password/:id", changePassword);

export default router;
