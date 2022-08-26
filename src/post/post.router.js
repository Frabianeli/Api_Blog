const router = require('express').Router()
const passport = require('passport')

require('../middleware/auth.middleware')(passport)

const postServices = require('./post.http')

router.route('/')
    .get(postServices.getAll)
    .post(passport.authenticate('jwt', {session: false}), postServices.create)

router.route('/:id')
    .get(postServices.getById)


exports.router = router