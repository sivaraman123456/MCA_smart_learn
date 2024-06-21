import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    pdf: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
      unique: true,
    },
    subject: {
      type: String,
      required: true,
    },
  sem: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const Question = mongoose.model('Question', userSchema);
export default Question;
