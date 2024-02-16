//const faker = require('@faker-js/faker@')
const {test, expect} = require('@playwright/test')
const login = require('../selectors/login.json')
const {Login_User} = require('../../pageobject/Account')

const exp = require('constants')
test.describe("Login",async()=>{

    let page
    test.beforeAll(async({browser})=>{
    const context = await browser.newContext()
    page = await context.newPage()
    await page.goto("/")
    await page.getByLabel(login.dialog_close).click()
})

    test("Verify Login",async()=>{
        const Login = new Login_User(page)
        const password = "wxyz@1234"
        await Login.signin(password)
        await Login.logOut()
    })  
})


test.describe.serial("Smoke Test",async()=>{

let page
test.beforeAll(async({browser})=>{
    const context = await browser.newContext()
    page = await context.newPage()
    await page.goto("/")
    await page.getByLabel(login.dialog_close).click()
})

test("Verify Add Product to Cart",async()=>{
    await page.goto("/pro-tools/pro-irons/express-ion-clipped-detachable-curling-iron")
    await page.locator("#cartBtn").click()
    const success_addtocartmsg = await page.locator("#toast-root").textContent()
    expect(page.locator("#toast-root")).toHaveText("Your product has successfully been added to your bag.")
})

test("Verify Qty can be increased and add Product to Cart",async()=>{
    await page.goto("/pro-tools/pro-irons/express-ion-clipped-detachable-curling-iron")
    await page.getByRole('textbox',{name:'Item Quantity'}).fill("3")
    await page.locator("#cartBtn").click()
    const success_addtocartmsg = await page.locator("#toast-root").textContent()
    expect(success_addtocartmsg).toContain("Your product has successfully been added to your bag.")
    //await page.locator(".item-root-fcS.grid.opacity-100.text-sm")
    await page.waitForTimeout(5000)
    const value = await page.locator(".item-minicartQuantityChanger-5WB").getByRole('textbox',{name:'Item Quantity'})
    expect(value).toHaveValue('4')
})


test("Verify Configurable product to be added to Cart",async()=>{
    await page.goto("/tea-tree/tea-tree-special-detox/tea-tree-special-detox-kombucha-rinse")
    const select = page.locator(".tileList-root-7EZ")
    await select.click()
    await select.selectOption({index:2})    
    await page.locator("#cartBtn").click()
    const success_addtocartmsg = await page.locator("#toast-root").textContent()
    expect(page.locator("#toast-root")).toHaveText("Your product has successfully been added to your bag.")

})

test("Verify Shopping Cart",async()=>{
    await page.goto("/tea-tree/tea-tree-special-detox/tea-tree-special-detox-kombucha-rinse")
    const select = page.locator(".tileList-root-7EZ")
    await select.click()
    await select.selectOption({index:2})    
    await page.locator("#cartBtn").click()
    const success_addtocartmsg = await page.locator("#toast-root").textContent()
    expect(page.locator("#toast-root")).toHaveText("Your product has successfully been added to your bag.")
    await page.locator(".miniCart-sliderLine-Ht4").click()
    expect(page.url()).toContain("https://www.paulmitchell.com/cart")
    const product_price = await page.locator(".product-price-nQ-").first().textContent()
    const trim_price = product_price.replace(/[^\d.]/g, '');
    console.log(product_price)
    console.log(trim_price)
    const qty_value = await page.getByRole('textbox', { name: 'Item Quantity' }).first().inputValue()
    const total_price = trim_price * qty_value
    const subtotal = await page.locator(".priceSummary-price-Nuk.justify-self-end.self-center").first().textContent()
    const trim_subtotal = subtotal.replace(/[^\d.]/g, '')+"."
    console.log("Sbutotal: ", trim_subtotal)
    expect(trim_price).toEqual(trim_subtotal)
})


})
