const {Schema, model} = require('mongoose')

const schema = new Schema({
    name: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    likedPosts: {type: Array},
    avatar: {type: String},
    dataRegister: {type: Date, default: Date.now}
})

module.exports = model('User', schema)