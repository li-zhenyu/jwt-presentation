const express = require('express')
const app = express()
const PORT = process.env.PORT || '3000'

// fake user
const user = {
  uid: 229933,
  username: 'Xiao Ming'
}

const secret = 's3cr3t'

app.get('/', (req, res) => {
  res.send('home page')
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})