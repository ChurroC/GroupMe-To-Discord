if (process.env.NODE_ENV !== 'production'){ require('dotenv').config() }
const express = require('express')
const bot = require('./bot')

const app = express()

PORT = process.env.PORT || 8080

app.use(express.json())

app.get('/', (req, res) => {
    bot.sendMessage('sefg', 'https://i.groupme.com/128x128.gif.2e618c66bf5a4290b3295d321ee43423')
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send(err)
        })
})

app.get('/new-message', (req, res) => {
    console.log('new message')
    const body = JSON.stringify(req.body)
    console.log(`You sent: ${body} to Exprwess`)
    res.send('jks')
})

app.listen(PORT, ()=>{console.log(`App listening at port ${PORT}`)})