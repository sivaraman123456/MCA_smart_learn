

import Question from "../models/question.model.js";

const uploadQuestion = async (req, res) => {
    console.log(req.body);
    if (!req.files || !req.files['file'] || !req.files['image']) {
        return res.status(400).json({ success: false, message: "Files not found" });
    }


    const subject = req.body.subject;
    const sem = req.body.sem;
    const filename = req.files['file'][0];
    const imagename = req.files['image'][0];
    let existingUser = await Question.findOne({filename})
    if( existingUser)
        {
           return  res.json({success:false,message:"File  already exists.."})
        }
    if (!filename || !filename.filename || !imagename || !imagename.filename) {
        return res.status(400).json({ success: false, message: "Invalid file upload" });
    }

    console.log("filename:", filename.filename);
    console.log("imagename:", imagename.filename);

    try {
        const file = new Question({
            pdf: filename.filename,
             subject: subject,
            sem: sem,
            image: imagename.filename
        });
        const fileUploaded = await file.save();
        res.status(201).json({ message: 'The Question upload success', fileUploaded });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error" });
    }
};

export default uploadQuestion;
