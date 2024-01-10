const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema for user
const UserSchema = new Schema({
    id: { type: String, required: true},
    email: { type: String, required: true },
    password: { type: String, required: true },
    plan1: { type: String, required: true },
    plan2: { type: String, required: true },
    plan3: { type: String, required: true }
});

// Export model
module.exports = mongoose.model("User", UserSchema);