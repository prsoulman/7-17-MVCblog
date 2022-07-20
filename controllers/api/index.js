const router = require('express').Router()
const userRoutes = require('./user-routes')
router.use('/user', userRoutes)

const postRoutes = require('./post-routes')
router.use('/post', postRoutes)







module.exports=router