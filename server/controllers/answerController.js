import EBAnswers from "../models/EBAnswers.js";
import User from "../models/User.js";

const randomFortune = async (req, res) => {
  const randomAnswerObject = await EBAnswers.aggregate([
    { $sample: { size: 1 } },
  ]);

  const fortune = randomAnswerObject[0].answer;

  res.status(200).send(fortune);
};

const createQAPair = async (req, res) => {
  const { question, answer } = req.body;

  if (!question || !answer) {
    throw new Error("A question or answer is missing");
  }
  const newAnswerPair = { question, answer };
  // qaPairs.push(newAnswerPair);

  const user = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { $push: { questionAnswer: newAnswerPair } }
  );

  res.status(200).send(user.questionAnswer);
};

const getQAPairs = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });

  res.status(200).json(user.questionAnswer);
};

export { randomFortune, createQAPair, getQAPairs };
