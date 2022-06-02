const pdf = require('pdf-parse')
const fs = require('fs')
const axios = require('axios')

/*
async function pdfToText(filePath){
    const data = await fs.readFileSync(filePath, 'utf8')
    const { text } = await pdf(data)
    return text
}*/
console.log('jio')
axios.get(`https://fremdbands.weebly.com/uploads/5/4/5/2/54522937/vmb_2022_-_summer-fall_calendar_-_5-17-22.pdf`, { timeout: 5000 })
    .then(response => {
        console.log('hjkl')
        res.send(response.data)
    })
    .catch(error => {
        console.log(error)
    })