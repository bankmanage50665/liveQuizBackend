const { validationResult } = require("express-validator");

const HttpError = require("../utils/HttpError");
const Note = require("../model/notes_model");

async function createNotes(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty) {
    return next(new HttpError("Notes credentials are invalid", 500));
  }

  const { title, description, chapter, subject, year } = req.body;

  const createdNotes = new Note({
    title,
    description,
    chapter,
    subject,
    year,
  });

  try {
    await createdNotes.save();
  } catch (err) {
    return next(
      new HttpError("Field to create notes, Please try again later.", 401)
    );
  }

  return res.status(201).json({
    message: "Notes created successfully",
    notesId: createdNotes.id,

    notes: createdNotes.toObject({ getters: true }),
  });
}

async function getAllNotes(req, res, next) {
  let notes;

  try {
    notes = await Note.find();
  } catch (err) {
    return next(new HttpError("Field to fetch notes .", 500));
  }

  res.json({
    message: "List of notes fetch sucessfully.",
    notes: notes.map((notes) => notes.toObject({ getters: true })),
  });
}

async function getNotesById(req, res, next) {
  const notesId = req.params.id;

  if (!notesId) {
    return next(new HttpError("Couldn't find notesId"));
  }

  let findNotes;

  try {
    findNotes = await Note.findById(notesId);
  } catch (err) {
    return next(new HttpError("Field to find notes provided id", 500));
  }

  res.json({
    message: "Find notes sucessfully with id.",
    note: findNotes.toObject({ getters: true }),
  });
}

async function deleteNote(req, res, next) {
  const notesId = req.params.id;
  if (!notesId) {
    return next(new HttpError("Couldn't find notesId for delete"));
  }

  let findNotes;

  try {
    findNotes = await Note.findById(notesId);
  } catch (err) {
    return next(new HttpError("Field to find notes provided id", 500));
  }

  try {
    await findNotes.deleteOne();
  } catch (err) {
    return next(new HttpError("Field to delete note", 500));
  }

  res.json({ message: "Note deleted sucessfully" });
}

async function updateNote(req, res, next) {
  const noteId = req.params.id;
  const { title, description, chapter, subject, year } = req.body;

  let findNotes;

  try {
    findNotes = await Note.findById(noteId);
  } catch (err) {
    return next(
      new HttpError("Field to find notes provided id for update.", 500)
    );
  }
 

  if (!findNotes) {
    return next(new HttpError("Couldn't find note in database."));
  }

  findNotes.title = title;
  findNotes.description = description;
  findNotes.chapter = chapter;
  findNotes.subject = subject;
  findNotes.year = year;

  try {
    await findNotes.save();
  } catch (err) {
    return next(
      new HttpError("Field to update note, Please try again later.", 500)
    );
  }

  res.json({ message: "Note update sucessfully." });
}
module.exports = {
  createNotes,
  getAllNotes,
  getNotesById,
  deleteNote,
  updateNote,
};
