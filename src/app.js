//Dependencias
const express = require('express')
const passport = require('passport')
require('./middleware/auth.middleware')(passport)

//Archivos de rutas
const userRouter = require('./users/users.router').router
const authRouter = require('./auth/auth.router').router
const postRouter = require('./post/post.router').router
const config = require('./config')

//Configuraciones iniciales
const app = express()


//Esta configuracion es para habilitar el body
app.use(express.json())

app.use('/api/v1/posts', postRouter), 
app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)

app.listen(config.port, () => {
    console.log(`Server started at port ${config.port}`)
})


module.exports = app