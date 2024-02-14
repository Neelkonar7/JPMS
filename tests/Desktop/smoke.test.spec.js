//const faker = require('@faker-js/faker@')
const {test, expect} = require('@playwright/test')
const login = require('../selectors/login.json')
const {Login_User} = require('../../pageobject/Account')

test.describe.serial("Smoke Test",async()=>{

let page
test.beforeAll(async({browser})=>{
    const context = await browser.newContext()
    page = await context.newPage()
})

test("Verify Login",async()=>{
    await page.goto("https://mcstaging.paulmitchell.com/")
    await page.getByLabel(login.dialog_close).click()
    const Login = new Login_User(page)
    const password = "wxyz@1234"
    await Login.signin(password)
    await Login.logOut()
})

test("Verify Add Product to Cart",async()=>{
    await page.goto("https://mcstaging.paulmitchell.com/mitch-grab-go-clean-cut-duo")
    //await page.getByLabel(login.dialog_close).click()
    await page.locator("#cartBtn").click()
    const success_addtocartmsg = await page.locator("#toast-root").textContent()
    expect(page.locator("#toast-root")).toHaveText("Your product has successfully been added to your bag.")
})

test("Verify Adding multiple Product to Cart",async()=>{
    await page.goto("https://mcstaging.paulmitchell.com/mitch-grab-go-clean-cut-duo")
    //await page.getByLabel(login.dialog_close).click()
    await page.getByLabel('Item Quantity').nth(1).fill("3")
    await page.locator("#cartBtn").click()
    const success_addtocartmsg = await page.locator("#toast-root").textContent()
    expect(page.locator("#toast-root")).toHaveText("Your product has successfully been added to your bag.")
    //await page.locator(".item-root-fcS.grid.opacity-100.text-sm")
    await page.waitForTimeout(5000)
    const value = await page.getByRole('complementary').getByLabel('Item Quantity')
    expect(value).toHaveValue('4')
})


test("Verify Configurable product to be added to Cart",async()=>{
    await page.goto("https://mcstaging.paulmitchell.com/express-ion-ceramic-hair-waver")
    //await page.getByLabel(login.dialog_close).click()
    const select = page.locator(".tileList-root-7EZ")
    await select.click()
    await select.selectOption({index:1})    
    await page.locator("#cartBtn").click()
    const success_addtocartmsg = await page.locator("#toast-root").textContent()
    expect(page.locator("#toast-root")).toHaveText("Your product has successfully been added to your bag.")

})
})
