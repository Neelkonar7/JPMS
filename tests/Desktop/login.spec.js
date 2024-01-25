const {test} = require('@playwright/test')
const login = require('../selectors/login.json')
const {Login_User} = require('../../pageobject/Account')


test.describe.serial('Test Login by enabling/disabling the cookies & information',()=>{

let page;
test.beforeAll(async({browser})=>{
    page = await browser.newPage()
})

test("Verify Login by enabling the cookies preferences",async({})=>{
    await page.goto("https://mcstaging.paulmitchell.com/")
    await page.getByLabel(login.dialog_close).click()
    const Login = new Login_User(page)
    const password = "wxyz@1234"
    await Login.signin(password)
    await Login.logOut()
    
})

test("Verify Login by disabling the cookies preferences",async({page})=>{
    await page.goto("https://mcstaging.paulmitchell.com/")
    await page.getByLabel(login.dialog_close).click()
    const password = "wxyz@1234"
    const Login = new Login_User(page)
    await Login.cookiesdisable()
    await Login.signin(password)
    await Login.logOut()
})

test("Verify Login by enabling the Donot Sell my information",async({page})=>{
    await page.goto("https://mcstaging.paulmitchell.com/")
    await page.getByLabel(login.dialog_close).click()
    const Login = new Login_User(page)
    await Login.donotsellmyinformation()
    await Login.signin()
    await Login.logOut()
})

test("Verify by Disabling cookies and create a new user on the Consumer Page.",async({page})=>{
    await page.goto("https://mcstaging.paulmitchell.com/")
    await page.getByLabel(login.dialog_close).click()
    const Login = new Login_User(page)
    await Login.cookiesdisable()
    //await Login.createnewUser()
    await Login.createnewUser()
    await Login.myAccount()
    await page.waitForTimeout(3000)
    await page.getByRole('button', { name: 'Sign Out' }).click()
})
})
