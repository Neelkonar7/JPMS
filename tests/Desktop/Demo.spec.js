const {test} = require('@playwright/test')
const login = require('../selectors/login.json')
const {Login_User} = require('../../pageobject/Account')
const {pwa_account} = require('../../pageobject/pwa_account')


test.describe.serial('Test Login by enabling/disabling the cookies & information',()=>{

/*let page;
test.beforeAll(async({browser})=>{
    page = await browser.newPage()
})*/

test("Verify @Web Login by enabling the cookies preferences",async({page})=>{
    await page.goto("https://mcstaging.paulmitchell.com/")
    await page.getByLabel(login.dialog_close).click()
    const Login = new Login_User(page)
    const password = "wxyz@1234"
    await Login.signin(password)
    await Login.logOut()
    
})

test("Verify @Web Login by disabling the cookies preferences",async({page})=>{
    await page.goto("https://mcstaging.paulmitchell.com/")
    await page.getByLabel(login.dialog_close).click()
    const password = "wxyz@123"
    const Login = new Login_User(page)
    await Login.signin(password)
    await Login.logOut()
})

test("Verify @PWA Login by enabling the cookies preferences",async({page})=>{
    await page.goto("https://mcstaging.paulmitchell.com/")
    await page.getByLabel(login.dialog_close).click()
    const password = "wxyz@1234"
    const pwaLogin = new pwa_account(page)
    await pwaLogin.pwaSignin(password)
    await pwaLogin.pwaLogout()
    await page.close()
})

test("Verify @PWA Login by disabling the cookies preferences",async({page})=>{
    await page.goto("https://mcstaging.paulmitchell.com/")
    await page.getByLabel(login.dialog_close).click()
    
    const Login = new Login_User(page)
    const pwaLogin = new pwa_account(page)
    await page.locator(".footer-footerinfoheading-6Lt").filter({hasText : 'Resources'}).click()
    const password = "wxyz@123"
    await pwaLogin.pwaSignin(password)
    await pwaLogin.pwaLogout()
    await page.close()
})

})