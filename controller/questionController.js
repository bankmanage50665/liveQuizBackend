const mongoose = require("mongoose");

const User = require("../model/user_modal");
const HttpError = require("../utils/HttpError");

const Question = require("../model/question_modal");
async function create(req, res, next) {
  try {
    const {
      question,
      options,
      correctAnswer,
      board,
      class: className,
      subject,
      topic,
      exam,
      creator,
    } = req.body;

    // Validate that correctAnswer is one of the options
    if (!options.includes(correctAnswer)) {
      return res.status(400).json({
        error: "Correct answer must be one of the provided options",
      });
    }

    const newQuestion = new Question({
      question,
      options,
      correctAnswer,
      board,
      class: className,
      subject,
      topic,
      exam,
      creator: creator,
      favorites: [],
      likes: [],
      reports: [],
      solvedLater: [],
    });

    let findedUser;

    try {
      findedUser = await User.findById(newQuestion.creator);
    } catch (err) {
      new HttpError("Something went wrong, Please try again later.");
    }

    if (!findedUser) {
      return new HttpError("Couldn't find user with this provided id.");
    }

    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await newQuestion.save({ session: sess });
      findedUser.questions.push(newQuestion);
      await findedUser.save({ session: sess });
      await sess.commitTransaction();
    } catch (err) {
      new HttpError("Something went wrong, Please try again later.");
    }

    res.status(201).json({ message: "Questions created sucessfully" });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
}

async function getQuestions(req, res, next) {
  try {
    const { board, class: className, subject, topic, exam } = req.query;

    // Build filter object dynamically
    const filter = {};
    if (board) filter.board = board;
    if (className) filter.class = className;
    if (subject) filter.subject = subject;
    if (topic) filter.topic = topic;
    if (exam) filter.exam = exam;

    // Add sort to show newest questions first
    const questions = await Question.find(filter).sort({ createdAt: -1 });

    res.json({ questions });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

async function getQuestionsById(req, res, next) {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        error: "Question not found",
      });
    }

    res.json(question);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

async function updateQuestions(req, res, next) {
  try {
    const {
      question,
      options,
      correctAnswer,
      board,
      class: className,
      subject,
      topic,
      exam,
    } = req.body;

    // Validate that correctAnswer is one of the options
    if (options && !options.includes(correctAnswer)) {
      return res.status(400).json({
        error: "Correct answer must be one of the provided options",
      });
    }

    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      {
        question,
        options,
        correctAnswer,
        board,
        class: className,
        subject,
        topic,
        exam,
      },
      {
        new: true, // Return the updated document
        runValidators: true, // Run model validations on update
      }
    );

    if (!updatedQuestion) {
      return res.status(404).json({
        error: "Question not found",
      });
    }

    res.json(updatedQuestion);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
}

async function deleteQuestion(req, res, next) {
  try {
    const deletedQuestion = await Question.findById(req.params.id).populate(
      "creator"
    );

    if (!deletedQuestion) {
      return res.status(404).json({
        error: "Question not found",
      });
    }

    const sess = await mongoose.startSession();
    sess.startTransaction();
    await deletedQuestion.deleteOne({ session: sess });
    deletedQuestion.creator.questions.pull(deletedQuestion);
    await deletedQuestion.creator.save({ session: sess });
    await sess.commitTransaction();

    res.json({
      message: "Question deleted successfully",
      deletedQuestion,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

module.exports = {
  create,
  getQuestions,
  getQuestionsById,
  deleteQuestion,
  updateQuestions,
};
