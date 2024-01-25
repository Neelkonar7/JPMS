const {test} = require('@playwright/test')
const login = require('../selectors/login.json')
const {Login_User} = require('../../pageobject/Account')
const {pwa_account} = require('../../pageobject/pwa_account')


test.describe.serial('Test Login by enabling/disabling the cookies & information',()=>{

let page;
test.beforeAll(async({browser})=>{
    page = await browser.newPage()
})

test("Verify PWA Login by enabling the cookies preferences",async({})=>{
    await page.goto("https://mcstaging.paulmitchell.com/")
    await page.getByLabel(login.dialog_close).click()
    const pwaLogin = new pwa_account(page)
    await pwaLogin.pwaSignin()
    await pwaLogin.pwaLogout()
    await page.close()
})

test("Verify PWA Login by disabling the cookies preferences",async({page})=>{
    await page.goto("https://mcstaging.paulmitchell.com/")
    await page.getByLabel(login.dialog_close).click()
    
    const Login = new Login_User(page)
    const pwaLogin = new pwa_account(page)
    await page.locator(".footer-footerinfoheading-6Lt").filter({hasText : 'Resources'}).click()
    await Login.cookiesdisable()
    await pwaLogin.pwaSignin()
    await pwaLogin.pwaLogout()
})

test("Verify PWA Login by enabling the Donot Sell my information",async({page})=>{
    await page.goto("https://mcstaging.paulmitchell.com/")
    await page.getByLabel(login.dialog_close).click()
    const Login = new Login_User(page)
    const pwaLogin = new pwa_account(page)
    await page.locator(".footer-footerinfoheading-6Lt").filter({hasText : 'Resources'}).click()
    await Login.donotsellmyinformation()
    await pwaLogin.pwaSignin()
    await pwaLogin.pwaLogout()
})

test("Verify PWA by Disabling cookies and create a new user on the Consumer Page.",async({page})=>{
    await page.goto("https://mcstaging.paulmitchell.com/")
    await page.getByLabel(login.dialog_close).click()
    const Login = new Login_User(page)
    const pwaLogin = new pwa_account(page)
    await page.locator(".footer-footerinfoheading-6Lt").filter({hasText : 'Resources'}).click()
    await Login.cookiesdisable()
    await pwaLogin.pwacreatenewUser()
    await page.getByRole('button', { name: 'Sign Out' }).click()
})
})
