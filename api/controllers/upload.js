
import File from "../models/file.model.js";

const uploadFiles = async (req, res) => {
    console.log(req.body);
    if (!req.files || !req.files['file'] || !req.files['image']) {
        return res.status(400).json({ success: false, message: "Files not found" });
    }

    const unit = req.body.unit;
    const subject = req.body.subject;
    const sem = req.body.sem;
    const category = req.body.category;
    const filename = req.files['file'][0];
    const imagename = req.files['image'][0];
    if (!filename || !filename.filename || !imagename || !imagename.filename) {
        return res.status(400).json({ success: false, message: "Invalid file upload" });
    }
    
    console.log("filename:", filename.filename);
    console.log("imagename:", imagename.filename);

    try {
        const file = new File({
            pdf: filename.filename,
            unit: unit,
            subject: subject,
            sem: sem,
            category: category,
            image: imagename.filename
        });
        const fileUploaded = await file.save();
        res.status(201).json({ message: 'The file upload success', fileUploaded });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error" });
    }
};

export default uploadFiles;
