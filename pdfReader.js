const fs = require('fs')
const axios = require('axios')
const pdfJS = require('pdfjs-dist')


async function pdfToText(filePath){
    try {
		const month = ("0" + (new Date().getMonth() + 1)).slice(-2)
		let page
		if (month == '06') { page = 1 }
		else if (month == '07') { page = 2 }
		else if (month == '08') { page = 3 }
		else if (month == '09') { page = 4 }
		else if (month == '10') { page = 5 }
		else { return }
		
		let data
        if (fs.existsSync(filePath)) {
            data = await fs.readFileSync(filePath)
        } else {
            const fileImage = await axios.get(filePath, { responseType: 'arraybuffer' })
            data = fileImage.data
        }
		
		const doc =	await pdfJS.getDocument({data:data}).promise
		let page1 = await doc.getPage(page)
		page1 = await page1.getTextContent()
		page1 = page1.items.filter(item => { return item.height == '9.24' || item.height == '10.08' });
		const notAllowed = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Viking Marching Band - June 2022']
		page1 = page1.filter(item => !notAllowed.includes(item.str))
		
		const numbers = []
		for (let i = 0; i<page1.length; i++) {
			if (/^\d+$/.test(page1[i].str)) {
				numbers.push([page1[i].str, i])
			}
		}
		
		const calendar = []
		for (let i = 0; i<numbers.length; i++) {
			const activities = []
			for (let j = 0; j<page1.length; j++) {
				const height = page1[numbers[i][1]].transform[5] - page1[j].transform[5]
				const width = page1[numbers[i][1]].transform[4] - page1[j].transform[4]
				if (j != numbers[i][1] && height < 60 && height > 0 && width < 93 && width > 0) {
					activities.push(page1[j].str)
				}
			}
			//Day First, Then activities
			if (activities.length != 0) {
				calendar.push([numbers[i][0]])
				for (let i of activities) {
					if (!(/^\d+$/.test(i))) {
						calendar[calendar.length - 1].push(i)
					}
				}
				if (calendar[calendar.length - 1].length == 1) {
					calendar.pop()
				}
			}
		}
		
		return(calendar)
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = pdfToText