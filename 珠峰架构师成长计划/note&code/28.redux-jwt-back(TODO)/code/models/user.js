const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connection = require('./index');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    admin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// 保存密码后加盐加密
UserSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            console.log(err);
            return;
        }
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) {
                console.log(err);
                return;
            }
            this.password = hash;
            next();
        })
    })
});

// 密码比对
UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

const User = connection.model('User', UserSchema);
module.exports = User;