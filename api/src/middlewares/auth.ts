import jwt from 'jsonwebtoken'

function auth(req, res, next) {
  const token = req.header('Authorization')

  if (!token) res.status(401).send('Error: Authorization header required.')
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch(error) {
    res.status(400).send('Error: ' + error)
  }
}

export = auth