const mongoose = require("mongoose")

const UserSchemaDetails = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        name: { 
            type: String, 
            required: true
        },
        lastname: { 
            type: String, 
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        company: { 
            type: String, 
            required: true
        },
        password: {
            type: String,
            required: true,
        },
        userType: {
            type: String,
            enum: ["Admin", "User"],
            required: true,
            default: "User",
        },
        created_at: {
            type: Date,
            default: Date.now,
        },
    },
    {
        collection: "UserInfo",
    }
)

UserSchemaDetails.statics.findById = function (userId) {
    return this.findOne({ _id: userId });
};

const User = mongoose.model("UserInfo", UserSchemaDetails);

module.exports = User;