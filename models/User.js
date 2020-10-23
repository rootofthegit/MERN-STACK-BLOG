const {Schema, model} = require('mongoose')

const schema = new Schema({
    name: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, default: "Customer"},
    likedPosts: [String],
    comments: [{
      postId: String,
      comment: String,
      date: String
    }],
    dataRegister: {type: Date, default: Date.now}
})

module.exports = model('User', schema)