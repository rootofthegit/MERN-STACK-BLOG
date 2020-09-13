const {Schema, model, Types} = require('mongoose')

const schema = new Schema ({
    Name: {type: String, required: true},
    ShortText: {type: String},
    Text: {type: String, required: true},
    date: {type: Date, default: Date.now},
    clicks: {type: Number, default: 0}
})

module.exports = model('Post', schema)