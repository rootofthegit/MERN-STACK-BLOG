const {Schema, model} = require('mongoose')

const schema = new Schema({
    name: {type: String},
    schoolName: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    openPassword: {type: String}
})

module.exports = model('User', schema)