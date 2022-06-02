if (process.env.NODE_ENV !== 'production'){ require('dotenv').config() }
let autoExport
if (process.env.NODE_ENV !== 'production'){ autoExport = require('./autoExport') }
const fs = require('fs')
const axios = require('axios')

//Basically shows all your groups and then shows details per each group.
async function allGroups(ACCESS_TOKEN = process.env.ACCESS_TOKEN){
    const response = await axios.get(`https://api.groupme.com/v3/groups?token=${ACCESS_TOKEN}`)
    return JSON.stringify(response.data)
}

//Shows the specific group details.
async function group(GROUP_ID = process.env.GROUP_ID, ACCESS_TOKEN = process.env.ACCESS_TOKEN){
    const response = await axios.get(`https://api.groupme.com/v3/groups/${GROUP_ID}?token=${ACCESS_TOKEN}`)
    return JSON.stringify(response.data)
}

//Shows the specific group messages.
async function groupMessages(GROUP_ID = process.env.GROUP_ID, ACCESS_TOKEN = process.env.ACCESS_TOKEN){
    const response = await axios.get(`https://api.groupme.com/v3/groups/${GROUP_ID}/messages?token=${ACCESS_TOKEN}`)
    return JSON.stringify(response.data)
}

//Basically shows all your bots and then shows details per each bot.
async function bots(ACCESS_TOKEN = process.env.ACCESS_TOKEN){
    const response = await axios.get(`https://api.groupme.com/v3/bots?token=${ACCESS_TOKEN}`)
    return JSON.stringify(response.data)
}

//Turns into Groupme video.
async function imageService(fileLink, ACCESS_TOKEN = process.env.ACCESS_TOKEN){
    let data
    if (fs.existsSync(fileLink)) {
        data = await fs.readFileSync(fileLink)
    } else {
        const fileImage = await axios.get(fileLink, { responseType: 'arraybuffer' })
        data = fileImage.data
    }
    const response = await axios.post(`https://image.groupme.com/pictures`, data,
    {
        headers: {
            'X-Access-Token': ACCESS_TOKEN,
            'Content-Type': 'image/jpeg'
        }
    })
    return JSON.stringify(response.data)
}

//Bot sends message in group.
async function sendMessage(message, imageUrl = '', BOT_ID = process.env.BOT_ID){
    const response = await axios.post(`https://api.groupme.com/v3/bots/post`, {
        "bot_id": BOT_ID,
        "text": message,
        "attachments": [
            {
                "type": "image",
                "url": imageUrl
            }
        ]
    })
    return JSON.stringify(response.data)
}

if (process.env.NODE_ENV !== 'Production'){ autoExport( __filename, 'async function ') }

module.exports = {allGroups, group, groupMessages, bots, imageService, sendMessage, }