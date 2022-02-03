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

// if (EBAnswers) {
//   console.log("exists");
// } else {
// const answer = EBAnswers.insertMany(ebData);

// // EBAnswers.insertMany(data, function (error, docs) {});

// console.log(answer);
// answer.save().then(() => console.log("answer created"));
export default EBAnswers;
