const { User, Post } = require('../../models')

const router = require('express').Router()
router.get('/', (req, res)=>{
    User.findAll().then(users => res.json(users))
});

// GET /api/user/1
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findOne({where:{id:req.params.id}});

    if (!userData) {
      res.status(404).json({ message: 'No user found with that id!' });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});;

//POST /api/user/login
router.post('/login', async(req, res)=> {
  try {
    const userData = await User.findOne({where:{email:req.body.email}});
    if (!userData) {
      res.status(404).json({ message: 'No user found with that'
      });
      return; 
      }
      req.session.save(()=>{
        req.session.userId=userData.id;
        req.session.username=userData.name;
        req.session.loggedIn=true
        res.json(userData)
    })
    } catch (err) {
      res.status(500).json(err);
    }
})

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