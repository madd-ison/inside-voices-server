const AuthService = require('../auth/auth-service')

function requireAuth(req, res, next) {
    const authToken = req.get('Authorization') || ''

    let basicToken

    if (!authToken.toLowerCase().startsWith('basic ')) {
        return res.status(401).json({ error: 'Missing basic token' })
   } else {
       basicToken = authToken.slice('basic '.length, authToken.length)
   }
   const [tokenUsername, tokenPassword] = AuthService.parseBasicToken(basicToken)

    if(!tokenUsername || !tokenPassword) {
        return res.status(401).json({ error: 'Unauthorized request'})
    }

    AuthService.getUserWithUserName(
        req.app.get('db'),
        tokenUsername
    )
    // req.app.get('db')('users')
    //     .where({username: tokenUsername})
    //     .first()
        .then(user => {
            if (!user || user.password !== tokenPassword) {
                return res.status(401).json({error: 'Unauthorized request'})
            }
            req.user = user
            next()
        })
        .catch(next)
  }
  
  module.exports = {
    requireAuth
  }