if (process.env.NODE_ENV !== 'production'){ require('dotenv').config() }
const express = require('express')
const bot = require('./bot')

const app = express()

PORT = process.env.PORT || 8080

app.get('/', (req, res) => {})

app.post('/new-message', express.json(), (req, res) => {
    const body = req.body
    const text = body.text
    const name = body.name
    if (text == '!ping'){
      console.log('in')
        bot.sendMessage('pong')
            .catch(err => {
                res.send(err)
            })
    }
    if (text == '!hi'){
        bot.sendMessage(`Hi ${name}`)
            .catch(err => {
                res.send(err)
            })
  }
})

app.listen(PORT, ()=>{console.log(`App listening at port ${PORT}`)})