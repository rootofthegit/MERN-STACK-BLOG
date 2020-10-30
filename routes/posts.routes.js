const {Router} = require('express')
const Post = require('../models/Post')
const User = require('../models/User')
const router = Router()
const auth = require('../middleware/auth.middleware')
const start = require('../parser/urlParser')

router.get('/:page', async (req, res) => {
    const page = req.params.page * 1
    const limit = 33

    try {
        const posts = await Post.find().sort({ $natural: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit )
            .exec()

        const count = await Post.countDocuments()

        res.json({
            posts,
            totalPages: Math.ceil(count/limit),
            currentPage: page
        })
        /*const posts = await Post.find()
        res.json(posts)*/

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

router.get('/byid/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.json(post)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова!'})
    }
})

///api/posts/add

router.post('/add', auth, async (req, res) => {
    const userId = req.user.userId
    const user = await User.findById(userId)

    const userRole = user.role

    if (userRole === 'admin') {
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
    }
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

        const {parseLink, parseCategory} = req.body
        const userRole = user.role

        if (userRole === 'admin') {
            const parseData = await start(parseLink)
            console.log(parseData)
            parseData.map(async ad => {
                if (!!ad.photos[0]) {
                    const post = new Post({
                        category: parseCategory,
                        title: ad.title,
                        postText: ad.postText,
                        imageSrc: ad.photos[0],
                        images: ad.photos,
                        fullPostText: ad.fullPostText
                    })
                    await post.save()
                }
            })
            res.status(201).json({message: "все сработало"})
        } else {
            res.status(300).json({message: "Ты не админ, вот и хуй тебе!"})
        }

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова!'})
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const userId = req.user.userId
        const user = await User.findById(userId)

        const userRole = user.role

        if (userRole === 'admin') {
            Post.remove({_id: req.params.id}, function (err) {
                if (!err) {
                    console.log("Post Deleted")
                } else {
                    console.log(err)
                }
            })
            res.status(201).json({message: "Пост удален!"})
        } else {
            res.status(300).json({message: "Ты не админ, вот и хуй тебе!"})
        }

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова!'})
    }
})

module.exports = router