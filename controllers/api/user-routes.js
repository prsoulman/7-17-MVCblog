const { User } = require('../../models')

const router = require('express').Router()
router.get('/', (req, res)=>{
    User.findAll().then(users => res.json(users))
});


//POST /api/user
router.post('/', async(req, res)=> {
    try {
        const userData = await User.create(req.body)
        req.session.save(()=>{
            req.session.userId=userData.id;
            req.session.username=userData.name;
            req.session.loggedIn=true
            res.json(userData)
        })

    } catch (error) {
        res.json(error)
    }

})
module.exports= router