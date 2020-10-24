const {Schema, model} = require('mongoose')

const schema = new Schema ({
    title: {type: String},
    postText: {type: String},
    fullPostText: [],
    imageSrc: {type: String},
    images: [],
    date: {type: Date, default: Date.now},
    likes: {type: Number, default: 0},
    clicks: {type: Number, default: 0},
    comments: [{
        userName: String,
        comment: String,
        date: String
    }]
})

module.exports = model('Post', schema)




