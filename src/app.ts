import express from 'express'

const app = express()

app.use('', (req, res) => {
  res.send('Hi')
})

app.listen(3000)
