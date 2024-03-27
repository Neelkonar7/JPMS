const{test} = require('@playwright/test')



test("Verify Login",async({page})=>{
    await page.goto("https://mcstaging.paulmitchell.com/")
}) 