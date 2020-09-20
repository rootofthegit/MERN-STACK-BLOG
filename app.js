const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload');

const app = express()

app.use(express.json({extended: true}))
app.use(fileUpload())

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/posts', require('./routes/posts.routes'))




const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true

        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()
