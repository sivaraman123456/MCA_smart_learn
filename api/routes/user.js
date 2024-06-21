import { Router } from "express";
import register from "../controllers/register.js";
import login from "../controllers/login.js";
import {authorization} from "../middlewares/authorization.js"
import { validation } from "../middlewares/validation.js"
import verify from "../controllers/verify.js";
const router=Router()

router.post("/register",validation,register)
router.post("/login",validation,login)
router.get("/verify",authorization,verify)

export default router;