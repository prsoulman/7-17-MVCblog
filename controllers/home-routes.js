const { Post } = require('../models');

const router = require('express').Router()

router.get('/', async function (req, res) {
try {
    const postData = await Post.findAll()
    const posts = postData.map(post => post.get({plain: true}));
    res.render('homepage', {posts})
}
 catch (err) {console.log(err)}
});

router.get('/login', async function (req, res) {
    res.render('login')
})

router.get('/signup', async function (req, res) {
    res.render('signup')
})




module.exports=router