const {test, expect} = require('@playwright/test')
const login = require('../selectors/login.json')
const {Login_User} = require('../../pageobject/Account')
const {Checkout} = require('../../pageobject/Checkout')


test("Verify Not logged in Users Checkout",async({page})=>{

    await page.goto("https://mcstaging.paulmitchell.com/")
    await page.getByLabel(login.dialog_close).click()
    await page.locator(".brandMenu-pmMenuWrapper-BYy.flex.justify-center").hover()
    await page.locator(".brandMenu-menuFooterCta-baC").first().click() //Clicking on Shop Paul Mitchell 
    await page.locator(".textCTA").filter({hasText: 'See all products'}).click() // Clicking on See all products
    await page.locator("//a[@aria-label='Bond Rx Leave-In Treatment']").hover()
    await page.locator("(//button[@aria-label='Add to cart'])[2]").click()
    //await expect(page.locator(".productList-root-qQN")).hasText("Bond Rx Leave-In Treatment") //Bond Rx Leave-In Treatment
    await page.getByRole('button',{name: 'CHECKOUT'}).click()
    await page.getByText("Proceed to Checkout").click() //cart page
    await page.waitForTimeout(10000)
    //Checkout Process
    
    const checkout = new Checkout(page)
    await checkout.notLoggedinUser()
    await checkout.shippingInformation()
    await checkout.shippingMethod()
    await checkout.paymentCreditCard()
    await checkout.reviewConfirm()
})

test("Verify Logged in User Checkout",async({page})=>{
    await page.goto("https://mcstaging.paulmitchell.com/")
    await page.getByLabel(login.dialog_close).click()
    const login1 = new Login_User(page)
    const password = "wxyz@1234"
    await login1.signin(password)
    await page.locator(login.user_icon).click()
    expect(page.getByText("My Account")).toBeVisible()
    await page.locator("#navBackBtn").click()
    await page.locator(".brandMenu-pmMenuWrapper-BYy.flex.justify-center").hover()
    await page.locator(".brandMenu-menuFooterCta-baC").first().click() //Clicking on Shop Paul Mitchell 
    await page.locator(".textCTA").filter({hasText: 'See all products'}).click() // Clicking on See all products
    await page.locator("//a[@aria-label='Bond Rx Leave-In Treatment']").hover()
    await page.locator("(//button[@aria-label='Add to cart'])[2]").click()
    //await expect(page.locator(".productList-root-qQN")).hasText("Bond Rx Leave-In Treatment") //Bond Rx Leave-In Treatment
    await page.getByRole('button',{name: 'CHECKOUT'}).click()
    await page.getByText("Proceed to Checkout").click() //cart page
    await page.waitForTimeout(10000)
    //Checkout Process
    
    const checkout = new Checkout(page)
    await checkout.shippingMethod()
    await checkout.paymentCreditCard()
    await checkout.reviewConfirm()
    
})

