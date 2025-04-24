const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.userLogin || mongoose.model('userLogin', UserSchema);