
const {test, expect} = require('@playwright/test')
const login = require('../selectors/userauthentication.json')
const {Authentication} = require('../../pageobject/Account')
const cart = require('../selectors/cart.json')
const {Checkout} = require('/Users/milin/Desktop/Automation_JPMS/JPMS/pageobject/Checkout')

const exp = require('constants')
test.describe("user Authentication",async()=>{

    let page
    let context
    test.beforeEach(async({browser})=>{
    context = await browser.newContext()
    page = await context.newPage()
    await page.goto("/")
    await page.getByLabel(login.dialog_close).click()
})

    test.afterAll(async()=>{
        await context.close()
    })
    test("Verify Login",async()=>{
        const Login = new Authentication(page)
        const password = "wxyz@1234"
        await Login.signin(password)
        await Login.logOut()
    }) 
    
    test("user Registration",async()=>{
        const Login = new Authentication(page)
        await Login.createnewUser()
        await Login.myAccount()
        await page.waitForTimeout(3000)
        await page.getByRole('button', { name: 'Sign Out' }).click()
    })
})


test.describe.serial("Smoke Test",async()=>{

let page
let context
test.beforeAll(async({browser})=>{
    context = await browser.newContext()
    page = await context.newPage()
    await page.goto("/")
    await page.getByLabel(login.dialog_close).click()
})

test.afterAll(async()=>{
    await context.close()
})

test("Verify Add Product to Cart",async()=>{
    await page.goto(cart.PDP.product_url)
    await page.locator(cart.cartBtn).click()
    expect(page.locator(cart.success_addtocartmsg)).toHaveText(cart.expected_message)
})

test("Verify Qty can be increased and add Product to Cart",async()=>{
    await page.goto(cart.PDP.product_url)
    await page.getByRole('textbox',{name:'Item Quantity'}).fill("3")
    await page.locator(cart.cartBtn).click()
    expect(page.locator(cart.success_addtocartmsg)).toHaveText(cart.expected_message)
    //await page.locator(".item-root-fcS.grid.opacity-100.text-sm")
    await page.waitForTimeout(5000)
    const value = await page.locator(".item-minicartQuantityChanger-5WB").getByRole('textbox',{name:'Item Quantity'})
    expect(value).toHaveValue('4')
})


test("Verify Configurable product to be added to Cart",async()=>{
    await page.goto(cart.PDP.config_product_prod)
    const select = page.locator(cart.product_variants)
    await select.click()
    await select.selectOption({index:2})    
    await page.locator(cart.cartBtn).click()
    expect(page.locator(cart.success_addtocartmsg)).toHaveText(cart.expected_message)

})

test("Verify Checkout process",async()=>{
    const checkoutobj = new Checkout(page)
    await page.locator(cart.minicart_btn).click()
    expect(page.url()).toContain("https://www.paulmitchell.com/cart")
    await page.getByText("Proceed to Checkout").click()
    expect(page.url()).toContain("https://www.paulmitchell.com/checkout")
    await checkoutobj.notLoggedinUser()
    await checkoutobj.shippingInformation()
    await checkoutobj.shippingMethod()

})


})
