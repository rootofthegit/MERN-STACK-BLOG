const {Schema, model} = require('mongoose')

const schema = new Schema ({
    title: {type: String},
    postText: {type: String},
    imageSrc: {type: String},
    date: {type: Date, default: Date.now},
    likes: {type: Number, default: 0},
    clicks: {type: Number, default: 0},
    comments: [{
        userName: String,
        comment: String,
        date: Date
    }]
})

module.exports = model('Post', schema)




