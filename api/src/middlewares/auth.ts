import jwt from 'jsonwebtoken'

function auth(req, res, next) {
  const token = req.header('Authorization')

  if (!token) return res.status(401).json(null)
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch(error) {
    res.status(400).json(null)
  }
}

export = auth