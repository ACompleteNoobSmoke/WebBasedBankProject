const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    checking: {
        type: Number,
        required: true 
    },
    saving: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = mongoose.model('account', accountSchema);


