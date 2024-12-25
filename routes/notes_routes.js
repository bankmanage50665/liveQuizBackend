const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const notesController = require("../controller/notes_controller");
router.post(
  "/add",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("category").not().isEmpty(),
    check("subject").not().isEmpty(),
    check("year").not().isEmpty(),
  ],
  notesController.createNotes
);
router.get("/allNotes", notesController.getAllNotes);
router.get("/:id", notesController.getNotesById)
router.delete("/:id", notesController.deleteNote)
router.patch("/:id", notesController.updateNote)


module.exports = router;
