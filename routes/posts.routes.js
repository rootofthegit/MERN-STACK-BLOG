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



    // user.updateOne({email: "denis@gmail.com"}, {email: "kurbas@mail.ru"})
    // user.save()

    return res.status(201).json({message: postId})

    // const userLikePostExists = await User.findOne({likedPosts: likeId})
    //
    // if (likeExists) {
    //     likeExists
    // }

    // await Post.findByIdAndUpdate(req.params.id, {likes: 1}, function (err, user) {
    //
    //     if (err) return console.log(err);
    //     console.log("Обновленный объект", Post);
    // });
    //
    // res.json({message: "Лайк принят!"});

    // const post = new Post({title: postName, postText: postText, imageSrc: `/uploads/${file.name}`})
    // await post.save()
});

module.exports = router