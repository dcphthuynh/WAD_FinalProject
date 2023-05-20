import express from "express";
import Register from "../controllers/register.js"
import Login from "../controllers/login.js"
import Logout from "../controllers/logout.js";
const router = express.Router()

router.post("/register", Register)
router.post("/login", Login)
router.post("/logout", Logout)

export default router