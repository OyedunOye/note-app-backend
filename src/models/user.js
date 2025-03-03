const mongoose = require ('mongoose');

const { Schema, model } = mongoose;
const userSchema = Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    passwordHash: {type: String, required: true},
    notes: [{type:Schema.Types.ObjectId, ref: "Note"}]
},
{timestamps: true}
)

const User = model("User", userSchema)

module.exports = User