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

router.post('/addnewpost',
    [
        check('postName', 'Введите название поста').isLength({min: 1}),
        check('postText', 'Минимальная длинна поста 1 символ').isLength({min: 1})
    ],

    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    massage: 'Некорректная информация для создания нового поста'
                })
            }

            const {postName, postText} = req.body

            const post = new Post({title:postName, body:postText})

            await post.save()

            res.status(201).json({message: 'Приколись - ты добавил новый пост!', redirect: true})

        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }

    })

module.exports = router