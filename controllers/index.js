const router = require('express').Router()
const homeRoutes = require('./home-routes')
router.use('/', homeRoutes)
const apiRoutes = require('./api')
router.use('/api', apiRoutes)

const dashboardRoutes = require('./dashboard-routes')
router.use('/dashboard', dashboardRoutes)






module.exports=router