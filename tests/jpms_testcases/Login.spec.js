const {test, expect} = require('@playwright/test')
const login = require('../selectors/userauthentication.json')
const {ddaccount} = require('../pageobject/ddaccount')
const {CartPage} = require('../pageobject/CartPage')
const cart = require('../selectors/cart.json')
const TestcasesExcel = require('../utils/TestcasesExcel')

const SHEET = "Login";

test.describe("Login Scenarios",async()=>{
    let page,context
    test.beforeAll(async({browser})=>{
        context = await browser.newContext()
        page = await context.newPage()
        await page.goto("/")
        await page.getByLabel(login.dialog_close).click()
    })

    test.afterAll(async()=>{
        await context.close()
    })
    const excelutils = new TestcasesExcel()
    const data1 = excelutils.getTestData(SHEET,"TC01_Valid Login")

    test(`Scenario 1: ${data1.ID}`,async()=>{
        const userlogin = new ddaccount(page)
        await userlogin.login(data1.Email,data1.Password)
        await page.waitForTimeout(5000)
        await userlogin.validateAccount(data1.Email)
        await page.reload()
        await userlogin.logOut()
    })

    const data2 = excelutils.getTestData(SHEET,"TC02_Invalid password")
    test(`Scenario 2: ${data2.ID}`,async()=>{
            const userlogin = new ddaccount(page)
            await userlogin.login(data2.Email,data2.Password)
            const error_message = await page.locator(".errorMessage-root-uB8").locator("span").textContent()
            expect(error_message).toContain(data2.Expected_Message)
    })

    const data3 = excelutils.getTestData(SHEET,"TC03_SigninCheckout")
    test(`Scenario 3: ${data3.ID}`,async()=>{
        const cartpage = new CartPage(page)
        await cartpage.gotoProductPage(cart.PDP.product_url)
        await cartpage.addToCart()
        await cartpage.verifySuccessMessage(cart.expected_message)
        await cartpage.miniCart()
        await cartpage.shoppingCart()
        await page.locator(login.checkout_emailtxtbx).fill(data3.Email)
        await page.locator(login.passwordtxtbx).fill(data3.Password)
        await page.locator(".signIn-buttonsContainer-9tM.grid.w-full").click()
        //Need to add assertion , current new ticket created for the issue
    })

    const data4 = excelutils.getTestData(SHEET,"TC04_Invalid_Email")
    test(`Scenario 4: ${data4.ID}`,async()=>{
        await page.goto("/")
        await page.locator(login.user_icon).click()
        await page.locator(login.emailtxtbx).type(data4.Email, {delay:100})
        await page.waitForTimeout(5000)
        await page.getByText("Continue").first().click()
        const invalid_login_msg = await page.locator(".field-root-fSe.content-start.grid.text-colorDefault").locator("#email_error_msg").textContent()
        expect(await invalid_login_msg).toContain(data4.Expected_Message)
    })

    const data5 = excelutils.getTestData(SHEET,"TC05_Invalid_Email_Format")
    test(`Scenario 5: ${data5.ID}`,async()=>{
        await page.locator(login.emailtxtbx).fill(data5.Email)
        await page.waitForTimeout(5000)
        await page.getByText("Continue").first().click()
        const error_msg = await page.locator(".field-root-fSe.content-start.grid.text-colorDefault").locator("//p[contains(.,'Ex: abc@gmail.com')]").textContent()
        expect(error_msg).toContain(data5.Expected_Message)
    })
})