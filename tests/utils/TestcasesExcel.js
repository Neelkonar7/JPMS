const { error } = require('console')
const exceltojson = require('convert-excel-to-json')

class TestcasesExcel{
    constructor(){

    }

    getTestDataArray(Sheet){
        const result = exceltojson({
            sourceFile:"tests/utils/DataDriveTest.xlsx",
            columnToKey:{
                "*": "{{columnHeader}}"
            },
            sheetStubs:true,
            header:{
                rows:1
            },
            sheets:[Sheet],
            
        })
        return result[Sheet]
    }

    getTestData(Sheet,testID){
        const testData = this.getTestDataArray(Sheet)
        let found = false
        let data
        for(var i=0 ; i<testData.length ; i++ ){
            if(testData[i].ID===testID){
                data = testData[i]
                found = true
            }
        }
        if(!found){
            console.log(`Test '${testID}' was not found on sheet`)
        }
        return data
    }
}
const Test = new TestcasesExcel()
Test.getTestData("Login","TC01_Valid Login")

module.exports = TestcasesExcel