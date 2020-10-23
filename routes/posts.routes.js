const {Router} = require('express')
const Post = require('../models/Post')
const User = require('../models/User')
const router = Router()
const auth = require('../middleware/auth.middleware')
const start = require('../parser/urlParser')

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

router.post('/add', auth, async (req, res) => {

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
})

router.post('/like', auth, async (req, res) => {
    try {
        const {postId} = req.body
        const userId = req.user.userId

        const user = await User.findById(userId)
        const post = await Post.findById(postId)

        const likeIndex = user.likedPosts.indexOf(postId)
        if (likeIndex !== -1) {
            user.likedPosts.splice(likeIndex, 1)
            --post.likes
            await post.save()
            await user.save()
            return res.status(201).json({message: 'delete like'})
        } else {
            ++post.likes
            await post.save()
            user.likedPosts.push(postId)
            await user.save()
            return res.status(201).json({message: 'add like'})
        }
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова!'})
    }
})

router.post('/addcomment', auth, async (req, res) => {
    try {
        const userId = req.user.userId

        const {postId, comment, date} = req.body

        const user = await User.findById(userId)
        const post = await Post.findById(postId)
        const userName = user.name

        const userComment = {postId, comment, date}
        const postComment = {userName, comment, date}

        user.comments.push(userComment)
        post.comments.push(postComment)
        await post.save()
        await user.save()

        return res.status(201).json({message: 'comment added'})

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова!'})
    }
})

router.post('/parsing', auth, async (req, res) => {
    try {
        const userId = req.user.userId
        const user = await User.findById(userId)

        const {parseLink} = req.body
        const userRole = user.role

        if (userRole === 'admin') {
                const parseData = await start(parseLink)
                console.log(parseData)
            res.status(201).json({message:"все сработало"})
        } else {
            console.log("ТЫ НЕ АДМИН!!! МУДАК!")
        }

        /*
                const userComment = {postId, comment, date}
                const postComment = {userName, comment, date}

                user.comments.push(userComment)
                post.comments.push(postComment)
                await post.save()
                await user.save()

                return res.status(201).json({message: 'comment added'})*/

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова!'})
    }
})

module.exports = router