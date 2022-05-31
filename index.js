if (process.env.NODE_ENV !== 'production'){ require('dotenv').config() }
const express = require('express')
const api = require('./API')

const app = express()

PORT = process.env.PORT || 8080

app.get('/', (req, res) => {
    api.imageService('https://cafedelites.com/wp-content/uploads/2020/05/Churros-Recipe-IMAGE-124.jpg')
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send(err)
        })
    console.log('jkb')
})

app.get('/new-message', (req, res) => {
    console.log('new message')
})

app.listen(PORT, ()=>{console.log(`App listening at port ${PORT}`)})