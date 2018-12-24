const express = require('express')
const JWT = require('jsonwebtoken')
const app = express()
const PORT = process.env.PORT || '3000'

// fake user
const user = {
  uid: 229933,
  username: 'Xiao Ming'
}

const secret = 's3cr3t'

function getBearerToken(req) {
  if (!!req.headers.authorization) {
    return req.headers.authorization.split(' ')[1]
  } else {
    return ''
  }
}

function generateToken() {
  return JWT.sign({
    sub: user.uid,
    username: user.username
  }, secret)
}

function verifyToken(req, res, next) {
  const token = getBearerToken(req)
  if (token !== '') {
    JWT.verify(token, secret, (err, decoded) => {
      if (!err) {
        req.decodedData = decoded
        next()
      } else {
        res.sendStatus(403)
      }
    })
  } else {
    res.sendStatus(403)
  }
}


app.get('/', (req, res) => {
  res.send('home page')
})

app.post('/login', (req, res) => {
  const token = generateToken()
  res.json({
    token
  })
})

app.get('/user/account', verifyToken, (req, res) => {
  res.json({
    account: 1000000,
    decodedData: req.decodedData
  })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})