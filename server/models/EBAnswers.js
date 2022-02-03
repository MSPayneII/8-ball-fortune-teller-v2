import mongoose from "mongoose";
import { ebData } from "../ebData.js";

const EBAnswersSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  type: {
    type: String,
  },
  answer: {
    type: String,
  },
});

let EBAnswers = mongoose.model("EBAnswer", EBAnswersSchema);

// const answer = EBAnswers.insertMany(ebData);

export default EBAnswers;
