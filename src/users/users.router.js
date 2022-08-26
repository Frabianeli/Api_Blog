const router = require('express').Router()
const passport = require('passport')
const {roleAdminMiddleware} = require('../middleware/adminRole') 

require('../middleware/auth.middleware')(passport)

const userServices = require('./users.http')
const postServices = require('../post/post.http')

router.route('/')
    .get(userServices.getAll)

router.route('/me')
    .get(passport.authenticate('jwt', {session: false}), userServices.getMyUser)
    .put(passport.authenticate('jwt', {session: false}), userServices.editMyUser)
    .delete(passport.authenticate('jwt', {session: false}), userServices.removeMyUser)

router.route('/:id')
    .get(userServices.getById)
    .delete(passport.authenticate('jwt', {session: false}), roleAdminMiddleware, userServices.remove)
    .put(passport.authenticate('jwt', {session: false}), roleAdminMiddleware, userServices.edit)

router.route('/me/posts')
    .get(passport.authenticate('jwt', {session: false}), postServices.getMyPost)

router.route('/me/posts/:id')
    .get(passport.authenticate('jwt', {session: false}), postServices.getMyPostByID)
    .put(passport.authenticate('jwt', {session: false}), postServices.editMyPost)
    .delete(passport.authenticate('jwt', {session: false}), postServices.removeMyPost)

exports.router = router