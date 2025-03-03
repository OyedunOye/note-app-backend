const mongoose = require ('mongoose');

// Schema creation. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection

const { Schema, model } = mongoose;
const noteSchema = Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    user: {type:Schema.Types.ObjectId, ref: "User"}
    },
    {timestamps: true}
)

//To use our schema definition, we need to convert it into a Model we can work with. Do so by passing it into
//mongoose.model(ModelName, schema)

const Note = model("Note", noteSchema)

module.exports = Note