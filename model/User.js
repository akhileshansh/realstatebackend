
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const Role = require('./Role'); 
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phoneNumber: String,
    address: String,
    registrationDate: {
        type: Date,
        default: Date.now,
    },
    role_id: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
    },
});
// Pre-save middleware to hash the password before saving the user
userSchema.pre('save', async function (next) {
    const user = this;

    // Hash the password only if it is modified or a new user
    if (!user.isModified('password')) return next();

    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;
