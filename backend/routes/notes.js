const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator')

/////////ROUTE-1 GET_ALL_THE_NOTES (GET)  / LOGIN_REQ /////////////////
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured")
    }
})


/////////// ROUTE-2 ADD_A_NOTE ///// POST //////LOGIN_REQ///
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 5 }),
    body('description', 'description must be atleast 5 charachters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured")
    }
})

///////////route-3 /// update_existing_note/////
/// WE WILL REQUIRE ID OF THE NOTE THAT WE WANT TO UPDATE
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag };

        ////// find the note to be updated 
        let note = await Notes.findById(req.params.id);
        if (!note) {
            res.status(404).send("Not Found");
        }
        if (note.user.toString() !== req.user.id) {  //// chech in mongodb compass , we have a user parameter that stores the id of the user that created that note
            return res.status(404).send("Not Allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured")
    }

})

////////// ROUTE_4 DELTED_NOTE ////////
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        ////// find the note to be deleted 
        let note = await Notes.findById(req.params.id);
        if (!note) {
            res.status(404).send("Not Found");
        }
        if (note.user.toString() !== req.user.id) {  //// chech in mongodb compass , we have a user parameter that stores the id of the user that created that note
            return res.status(404).send("Not Allowed");
        }
        //// allow deletion only if user is the owner of the note
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json("success . Note has been deleted");
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured")
    }

})

module.exports = router
