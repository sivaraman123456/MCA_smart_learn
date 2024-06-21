import { Router } from "express";
import uploadFiles from "../controllers/upload.js";
import upload from "../middlewares/multerr.js";
import uploadQuestion from "../controllers/question.js";
import question_upload from "../middlewares/question.js";
const router=Router()

router.post('/single',upload.fields([{ name: 'file', maxCount: 1 }, { name: 'image', maxCount: 1 }]),uploadFiles)
router.post('/question',question_upload.fields([{ name: 'file', maxCount: 1 }, { name: 'image', maxCount: 1 }]),uploadQuestion)


export default router;