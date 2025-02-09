const noteRouter = require("express").Router();
const Note = require("../models/notes")
// const User = require("../models/user")
const { userExtractor } = require("../utils/middleware")

noteRouter.get("/", userExtractor, async (req, res) => {
    const user = req.user
    console.log(user)
    try{
        const userNotes = await Note.find({user}).populate('user', {firstName: 1, lastName: 1, email: 1});
        console.log(userNotes)
        if (!userNotes.length) {
            return res.status(404).json({ message: "No notes are found for this user" });
        }
        res.status(200).json({ notes: userNotes, message: "Notes retrieved successfully!" })
    } catch(error) {
        res.status(500).json({error: error, message:"Unable to connect to the server, please try again in a few minutes."})
    }
})

noteRouter.get("/:id", userExtractor, async (req, res) => {
    const id = req.params.id
    const user = req.user
    try {
        const selectedNote = await Note.find({_id:id, user}).populate('user', {firstName: 1, lastName: 1, email: 1});
        // In cases where tested with a note id not existing, it still goes ahead to the catch error block to return code 500. Why is it escaping the 404?
        console.log(selectedNote)
        if (!(selectedNote instanceof Array)) {
            return res.status(404).json({error: `No note with id ${id} is found for this user!`})
        }
        res.status(200).json({ note: selectedNote, message: "Note retrieved successfully!" })
        // console.log(selectedNote)
        } catch (error) {
        res.status(500).json({error: "Internal server error"})
    }
})

noteRouter.post("/", userExtractor, async (req, res) => {
    const { title, content } = req.body
    const user = req.user
    if(!title || !content ) {
        return res.status(400).json({error:"One or both of the required fields are missing."})
    }

    if(!user) {
        return res.status(403).json({error: "Unauthorized request."})
    }
    try {
        const newNote = new Note({ title, content, user })
        const savedNote = await newNote.save()
        user.notes = user.notes.concat(savedNote._id)
        user.save()
        res.status(201).json({note: savedNote, message: "New note created Successfully!"})
    } catch (error) {
        res.status(500).json({error: "Opps, there is an internal server error!"})
    }
})

//I do not get the update endpoint to work yet.
noteRouter.patch("/:id", userExtractor, async (req, res) => {
    const updates = req.body
    const id = req.params.id
    const user = req.user

    if(!user) {
        return res.status(403).json({error: "Unauthorized request."})
    }
    
    try {
        const updatedNote = await Note.find({_id:id, user}).updateOne( updates, {isDeleted: true});
        console.log(updatedNote)
        if (!updatedNote.length) {
            return res.status(404).json({error: `No note with id ${id} is found for this user!`})
        }
        res.status(200).json({note: updatedNote, message: "Existing note updated successfully!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal server error"})
    }
})

noteRouter.delete("/:id", userExtractor, async (req, res) => {
    const id = req.params.id
    const user = req.user

    // No check to prevent a user from deleting someone else's note
    // if(!user.notes.include(id)) {
    //     return res.status(403).json({error: "Unauthorized request."})
    // }
    
    try {
        const deletedNote = await Note.findOneAndDelete({user, _id:id})
        console.log(deletedNote)
        if (!deletedNote) {
            return res.status(404).json({message: "Note does not exist."})
        }
        res.status(200).json({message: "Note deleted Successfully!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal server error"})
    }
})

module.exports = noteRouter