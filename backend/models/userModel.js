const mongoose = require('mongoose');
const validator = require('validator');
const becrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [
            true, 'Please Enter Your Name'
        ],
        maxlength: [
            30, 'Name cannot exceed 30 chracters'
        ],
        minlength: [4, 'Name should have more then 4 charcters']
    },
    email: {
        type: String,
        required: [
            true, 'Please Enter Your Email'
        ],
        unique: true,
        validate: [validator.isEmail, 'Please Enter a valid Email']

    },
    password: {
        type: String,
        required: [
            true, 'Please Enter a Password'
        ],
        minlength: [
            5, 'Password should be atleast 5 character long'
        ],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: 'user'
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date
    }
});
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await becrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJwtToken = function () {
    return jwt.sign({
        id: this._id
    }, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRE});
}

// comapre Password
userSchema.methods.comparePassword = async function (enterdPassword) {
    return await becrypt.compare(enterdPassword, this.password);

}

module.exports = mongoose.model('User', userSchema);
