const fs = require('fs')

//Doesn't fully work in actuallly use.
//You must use module.export at the bottom for this work.
module.exports = function autoExport(filepath, functionRegex){
    let data = fs.readFileSync(filepath, 'utf8')
    const oldExports = data.substring(data.lastIndexOf('{')+1, data.lastIndexOf('}'))
    let newExport = ''
    const dataIndices = [...data.matchAll(new RegExp(functionRegex, 'g'))].map(match => match.index+15)
    for (i=0; i<dataIndices.length-1; i++){
        newExport += data.substring(dataIndices[i], data.indexOf('(', dataIndices[i])) + ', '
    }
    if (newExport !== oldExports){
        console.log(newExport)
        data = data.slice(0, data.lastIndexOf('{')+1) + newExport + data.slice(data.lastIndexOf('}'))
        fs.writeFileSync(filepath, data)
    }
}