if (process.env.NODE_ENV !== 'production'){ require('dotenv').config() }
const express = require('express')
const axios = require('axios')
const api = require('./API')

const app = express()

PORT = process.env.PORT || 8080

app.get('/', (req, res) => {
    api.sendMessage('sefg', 'https://i.groupme.com/128x128.gif.2e618c66bf5a4290b3295d321ee43423')
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send(err)
        })
})

app.get('/new-message', (req, res) => {
    console.log('new message')
})

app.listen(PORT, ()=>{console.log(`App listening at port ${PORT}`)})