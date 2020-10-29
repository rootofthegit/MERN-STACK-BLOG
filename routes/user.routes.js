const {Router} = require('express')
const User = require('../models/User')
const router = Router()
const auth = require('../middleware/auth.middleware')

router.get('/userdata', auth, async (req, res) => {
    const userId = req.user.userId
    const user = await User.findById(userId)
    res.json({name: user.name, email: user.email, role: user.role, likedPosts: user.likedPosts, comments: user.comments})
})

module.exports = router