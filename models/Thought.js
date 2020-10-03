const { Schema, model } = require('mongoose');
const moment  = require('moment');

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String, 
        required: true,
        min: 1,
        max: 280
    },
    createAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: true
    },
    reactions: {

    }
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;