const noteRouter = require("express").Router();
const Note = require("../models/notes")
const { userExtractor } = require("../utils/middleware")

noteRouter.get("/", userExtractor, async (req, res) => {
    const user = req.user
    console.log(user)
    try{
        const userNotes = await Note.find({user}).populate('user', {firstName: 1, lastName: 1, email: 1}).sort({updatedAt: -1});
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
        if (!selectedNote.length) {
            return res.status(404).json({error: `No note with id ${id} is found for this user!`})
        }
        res.status(200).json({ note: selectedNote, message: "Note retrieved successfully!" })
        } catch (error) {
            console.log(error.message)
        res.status(500).json({error: "Internal server error"})
    }
})

noteRouter.post("/", userExtractor, async (req, res) => {
    const { title, content } = req.body
    const user = req.user
    if(!title || !content ) {
        return res.status(400).json({error:"One or both of the required fields are missing."})
    }
    //403 error skipped when incorrect token or no token is provided for a user. Something to be corrected in userExtractor? Seem not needed as unregistered user can't login to even attempt creating a note, right?

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

noteRouter.patch("/:id", userExtractor, async (req, res) => {
    const updates = req.body
    const id = req.params.id
    const user = req.user

    try {
        const updatedNote = await Note.findOneAndUpdate({_id:id, user}, updates, {isDeleted: true});
        // console.log(updatedNote)
        if (!updatedNote) {
            return res.status(404).json({error: `No note with id ${id} is found for this user!`})
        }
        const updatedInstance = await Note.find({_id:id, user})
        res.status(200).json({note: updatedInstance, message: "Note has been updated successfully!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal server error"})
    }
})

noteRouter.delete("/:id", userExtractor, async (req, res) => {
    const id = req.params.id
    const user = req.user

    try {
        const deletedNote = await Note.findOneAndDelete({user, _id:id})
        console.log(deletedNote)
        if (!deletedNote) {
            return res.status(404).json({message: "Note does not exist."})
        }
        res.status(204).json({message: "Note deleted Successfully!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal server error"})
    }
})

module.exports = noteRouter
