const {check, validationResult} = require('express-validator');

const {Router} = require('express')
const Post = require('../models/Post')
const router = Router()

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.json(post)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

///api/posts/newpost

router.post('/add', async(req, res) => {
    if (req.files === null) {
        return res.status(400).json({msg: 'No file uploaded'});
    }

    const file = req.files.file;

    file.mv(`client/public/uploads/${file.name}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        res.json({fileName: file.name, filePath: `/uploads/${file.name}`});
    });
});


module.exports = router