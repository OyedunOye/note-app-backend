const noteRouter = require("express").Router();
const Note = require("../models/notes")
const User = require("../models/user")

noteRouter.get("/:user/notes", async (req, res) => {
    try{
        //user param is the foreign key(objectId) from userSchema and listed in noteSchema
        const {user} = req.params
        const userNotes = await Note.find({user}).populate('title', 'content');
        if (!userNotes.length) {
            return res.status(404).json({ message: "No notes are found for this user" });
        }
        // const userNotes = []
        // for (let i in Note){
        //     userNotes.push(i).populate('title', 'content')
        // }

        res.json(userNotes)
    } catch(error) {
        res.status(500).json({error: error})
    }
})

noteRouter.get("/:user/notes/:id", async (req, res) => {
    try {
        const id = req.params.id
        const {user} = req.params
        const selectedNote = await Note.find({user}).findById(id).populate('user', 'title', 'content');

        if (!selectedNote) {
            res.status(400).json({error: `No note with id ${id} is found for this user!`})
        }
        res.status(200).json(selectedNote)
    } catch (error) {
        res.status(500).json({error: error})
    }
    
})

noteRouter.post("/:user/notes", async (req, res) => {
    try {
        const { title, content } = req.body
        const { user } = req.params
        const userExists = await Note.find({user})
        if (!userExists) {
            return res.status(400).json({message: "User not found."})
        }
        const newNote = new Note({ title, content, user })
        const savedNote = await newNote.save()
        res.status(201).json({note: savedNote, message: "New note created Successfully!"})
    } catch (error) {
        res.status(500).json( {message: "Opps, there is an error!"}, {error: error})
    }
})
noteRouter.put("/:user/notes/:id", async (req, res) => {
    try {
        const { title, content } = req.body
        const { user } = req.params
        const selectedNoteExists = await Note.find({user}).findById(id)
        if (!selectedNoteExists) {
            return res.status(400).json({message: "User not found."})
        }
        const updatedNote = new Note({ title, content, user })
        const savedNote = await updatedNote.save()
        res.status(201).json({note: savedNote, message: "Existing note updated Successfully!"})
    } catch (error) {
        res.status(500).json({message: error})
    }
})
noteRouter.delete("/:user/notes/:id", async (req, res) => {
    
    try {
        const{ user } = req.params
        const id = req.params.id
        const selectedNote = Note.find({user}).findById(id)
        if (!selectedNote) {
            return res.status(400).json({message: "Note does not exist."})
        }
        const deletedNote = await selectedNote.delete()
        res.status(200).json({message: "Note deleted Successfully!"})
    } catch (error) {
        console.log(error)
    }
})

module.exports = noteRouter