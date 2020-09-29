const {check, validationResult} = require('express-validator');

const {Router} = require('express')
const Post = require('../models/Post')
const User = require('../models/User')
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
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова!'})
    }
})

///api/posts/add

router.post('/add', async (req, res) => {

    const file = req.files.file;
    const postName = req.body.postName
    const postText = req.body.postText

    file.mv(`client/public/uploads/${file.name}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        res.json({fileName: file.name, filePath: `/uploads/${file.name}`, postName: postName, postText: postText});
    });

    const post = new Post({title: postName, postText: postText, imageSrc: `/uploads/${file.name}`})
    await post.save()
});

router.post('/like', async (req, res) => {

    const {userId, postId} = req.body

    const user = await User.findById(userId)
    const post = await Post.findById(postId)

    const likeIndex = user.likedPosts.indexOf(postId)
    if (likeIndex !== -1) {
        user.likedPosts.splice(likeIndex, 1)
        --post.likes
        await post.save()
        await user.save()
        return res.status(201).json({message: `Есть уже такой! но мы удалили его ${postId}`})
    } else {
        ++post.likes
        await post.save()
        user.likedPosts.push(postId)
        await user.save()
        return res.status(201).json({message: `Нихуя!! но мы добавили!${postId}`})
    }
})

module.exports = router