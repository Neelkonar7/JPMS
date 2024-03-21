const Excel = require('exceljs')
const { read } = require('fs')



async function readExcel(){
    const wb = new Excel.Workbook()
    
    try{
        await wb.xlsx.readFile("tests/utils/DataDriveTest.xlsx")

        const ws = wb.getWorksheet('Login')
        const columnValues = []

        const c3 = ws.getColumn(3)
        c3.eachCell(c=>{
            columnValues.push(c.value)
        })
    }
    catch(error){
        console.error('Error Reading',error)
    }
}

module.exports = readExcel








/*
await wb.xlsx.readFile(filename).then(()=>{
    const ws = wb.getWorksheet('Login') //Sheet name
    const c1 = ws.getColumn(1)
    c1.eachCell(c=>{
        console.log(c.value)
    })

    const c2 = ws.getColumn(2)
    c2.eachCell(c=>{
        console.log(c.value)
    })
}).catch(err =>{
    console.log(err.message)
})*/