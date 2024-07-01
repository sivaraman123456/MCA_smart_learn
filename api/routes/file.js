import { Router } from "express";
import uploadFiles from "../controllers/upload.js";
import upload from "../middlewares/multerr.js";
import uploadQuestion from "../controllers/question.js";
import question_upload from "../middlewares/question.js";
import get_file from "../controllers/get_file.js";
import get_question from "../controllers/get_question.js";
import File from "../models/file.model.js";
import Question from "../models/question.model.js";
import  path  from 'path';
import fs from "fs";
const __dirname = path.resolve();
const router=Router()
router.post('/single',upload.fields([{ name: 'file', maxCount: 1 }, { name: 'image', maxCount: 1 }]),uploadFiles)
router.post('/question_upload',question_upload.fields([{ name: 'file', maxCount: 1 }, { name: 'image', maxCount: 1 }]),uploadQuestion)
router.get("/get_file",get_file)
router.get("/get_question",get_question)

router.delete("/delete_file/:dataId",async (req, res) => {
    try {
      // Find the PDF document by file_id
      const pdf = await File.findOne({ _id: req.params.dataId });
     
        if (!pdf) 
      {
        return res.status(404).json({ message: 'PDF not found' });
      }
  console.log(__dirname);
      
      console.log("image:", pdf);
  
      // Delete the files from the file system
      const imagePath = path.join(__dirname, '../api/files/', pdf.image);
      const pdfPath = path.join(__dirname, '../api/files/', pdf.pdf);
  
      if (fs.existsSync(imagePath)) {
       fs.unlinkSync(imagePath);
      }
  
      if (fs.existsSync(pdfPath)) {
        fs.unlinkSync(pdfPath);
      }
     // Delete the document from the database
      await File.deleteOne({ _id: req.params.dataId });
      res.send({ status: "ok" });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server error' });
    }
  })

router.delete("/delete_question/:dataId",async (req, res) => {
    try {
      // Find the PDF document by file_id
      const pdf = await Question.findOne({ _id: req.params.dataId });
  
      if (!pdf) {
        return res.status(404).json({ message: 'PDF not found' });
      }
  console.log(__dirname);
      
      console.log("image:", pdf);
  
      // Delete the files from the file system
      const imagePath = path.join(__dirname, '../api/questions/', pdf.image);
      const pdfPath = path.join(__dirname, '../api/questions/', pdf.pdf);
  
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
  
      if (fs.existsSync(pdfPath)) {
       fs.unlinkSync(pdfPath);
      }
      // Delete the document from the database
      await Question.deleteOne({ _id: req.params.dataId });
  
      res.send({ status: "ok" });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server error' });
    }
  })
export default router;