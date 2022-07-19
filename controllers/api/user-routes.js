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

// GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password']},
        where: {
          id: req.params.id
        },
        include: [
            {
              model: Post,
              attributes: ['id', 'title', 'post_text']
            },
            {
                model: Comments,
                attributes: ['id', 'comment_text',],
                include: {
                  model: Post,
                  attributes: ['title']
                }
            }
          ]

    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports= router