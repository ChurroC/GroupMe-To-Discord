const pdf = require('pdf-parse')
const fs = require('fs')
const axios = require('axios')


async function pdfToText(filePath){
    const pdf = await axios.get(`https://fremdbands.weebly.com/uploads/5/4/5/2/54522937/vmb_2022_-_summer-fall_calendar_-_5-17-22.pdf`)
    try {
        const data = await pdfParse(pdf.data)
    } catch (error) {
        console.log(error)
    }
}