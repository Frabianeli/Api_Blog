const { getUserById } = require('../users/users.controllers');

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt

module.exports = (passport) => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'), //Authorization JWT
        secretOrKey: 'academlo' //  Palabra secereta, debe estar en una variable de entorno
    };
    passport.use(
        new JwtStrategy(opts, (decoded, done) => {
            const data = getUserById(decoded.id) // veridicar si el usuari con el jwt existe
            if (data) {
                console.log('decoded jwt', decoded)
                return done(null, decoded) //decode sera el que retornaremos cuando se ejecute exitosamente la autenticacion
            } else {
                return done(null, false)
            }
        })
    )
}