const { Schema, model } = require('mongoose');
const moment  = require('moment');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: email => {
              return /.+@.+\..+/.test(email);
            },
            message: props => `${props.value} is not a valid email`
    }
    },
    thoughts: {

    },
    friends: {
        
    }

})

const User = model('User', UserSchema)

module.exports = User;