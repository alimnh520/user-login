import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    isVerified: {type: Boolean, default: false},
    isAdmin: {type: Boolean, default: false},
    verifyToken: String,
    verifyTokenExpiry: String,
    forgetToken: String,
    forgetTokenExpiry: String,
});

const UserProfile = mongoose.models.userProfile || mongoose.model('userProfile', UserSchema);

export default UserProfile