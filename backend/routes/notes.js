const express = require('express');
const Note = require('../models/Note');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// This is for fetch all notes from database
router.get('/fetchallnotes', async (req, res, next) => {
    try {
        const notes = await Note.find();
        return res.status(200).json(notes);
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'server error' });
    }
});


// This is for add note in data base
router.post('/addnotes', [
    body('title', 'Enter a valid title').isLength({ min: 4 }),
    body('description', 'Description must be at least of 5 character').isLength({ min: 5 }),
    body('tag').default('General'),], async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            // If there are errors , return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const notes = new Note({
                title, description, tag
            })
            const savedNote = await notes.save();

            res.json(savedNote)
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    });


// This is for edit in the note through backend
router.put("/updatenote/:id", async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // Create a newNote object
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }

        //Find the note to be update and update it
        let note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).send("Not Found");
        }

        note = await Note.findByIdAndUpdate(
            req.params.id,
            { $set: newNote },
            { new: true }
        );

        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// This is for delete the note
router.delete("/deletenote/:id", async (req, res) => {
    try {
        //Find the note to be delete and delete it
        let note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).send("Not Found");
        }

        note = await Note.findByIdAndDelete(
            req.params.id)

        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;