if (process.env.NODE_ENV !== 'production'){ require('dotenv').config() }
const express = require('express')
const bot = require('./bot')
const pdfReader = require('./pdfReader')
const nodeCron = require("node-cron")

const app = express()

PORT = process.env.PORT || 8080

const job = nodeCron.schedule('0 0 7 * * *', async () => { 
    const dates = await pdfReader('https://fremdbands.weebly.com/uploads/5/4/5/2/54522937/vmb_2022_-_summer-fall_calendar_-_5-17-22.pdf')
	for (let i of dates) {
		if (("0" + i[0]).slice(-2) == ("0" + new Date().getDate()).slice(-2)) {
			const awaitTest = await bot.sendMessage(`It is ${i[0]}`).catch(err => { console.log(err) })
			for (let j = 1; j < i.length; j++) {
				bot.sendMessage(`Today we have ${i[j]}`).catch(err => { console.log(err) })
			}
		}
	}
	},
	{
    scheduled: true,
    timezone: "America/Chicago"
});

app.get('/', (req, res) => {
	res.send('Hi')
})

app.post('/new-message', express.json(), (req, res) => {
    const body = req.body
    const text = body.text
    const name = body.name
    if (text == '!ping') {
      console.log('in')
        bot.sendMessage('pong')
            .catch(err => {
                res.send(err)
            })
    }
    if (text == '!hi') {
        bot.sendMessage(`Hi ${name}`)
            .catch(err => {
                res.send(err)
            })
  }
})

app.listen(PORT, ()=>{console.log(`App listening at port ${PORT}`)})