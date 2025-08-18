const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')

const getTokenFrom = request => {
  // The request object has a 'req' property containing the actual request
  const actualRequest = request.req || request
  
  if (!actualRequest || !actualRequest.headers) {
    return null
  }
  
  const authorization = actualRequest.headers.authorization
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

const getCurrentUser = async (request) => {
  const token = getTokenFrom(request)
  if (!token) {
    return null
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET)
    return decodedToken
  } catch (error) {
    return null
  }
}

module.exports = {
  getTokenFrom,
  getCurrentUser
}
