function requireAuth(req, res, next) {
    console.log('requireAuth')
    console.log(JSON.stringify(req.get('Authorization')))
    next()
  }
  
  module.exports = {
    requireAuth
  }