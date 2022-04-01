const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    passWord: {
        type: String,
        required: true
    },
    coverImage: {
        type: Buffer,
        required: true
    },
    coverImageType: {
        type: String,
        required: true
    },
    checking: {
        type: Number,
        required: true 
    },
    saving: {
        type: Number,
        required: true
    },
})

userSchema.virtual('coverImagePath').get(function(){
    if(this.coverImage != null && this.coverImageType != null){
        return `data:${this.coverImageType};charset=utf-8;base64, ${this.coverImage.toString('base64')}`
    }
});

module.exports = mongoose.model('User', userSchema);