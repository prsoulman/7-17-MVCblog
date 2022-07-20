const { Post, User } = require('../../models');
const { post } = require('./user-routes');

const router = require('express').Router();

router.post('/', async (req, res) => {
    try {
        const postData = Post.create({...req.body, userId: req.session.userId})
        res.json(postData);
    }
    catch (err) {console.log(err);
    }
})

router.get('/', async (req, res) => {
    Post.findAll({include: [User]}).then(data => {res.json(data)})
})



module.exports = router