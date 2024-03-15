import { count } from 'console'
import exp from 'constants'

const {test, expect} = require('@playwright/test')
const login = require('../selectors/userauthentication.json')
const faker = require('@faker-js/faker')

test.describe.serial("ProUser Smoke Test",async()=>{
    let page
    let context
    let lastname , email
    test.beforeAll(async({browser})=>{
        context = await browser.newContext({
          recordVideo : {
            dir: `protest_videos/${Date.now()}.mp4`,
            size:{
              width: 1920,
              height: 800
            },
            startOnFirstAction: true,
          }
        })
    
        page = await context.newPage()
        await page.goto("https://pro.mcstaging.paulmitchell.com/")
        await page.getByLabel(login.dialog_close).click()
    })
    
    test.afterAll(async()=>{
        await context.close()
    })


    test("Pro user Registeration",async()=>{
        test.slow()
        var firstname = "neelpro"
        lastname = generateRandomString(5)
        email = firstname+lastname+'@yopmail.com'
        await page.locator(login.user_icon).click()
        await page.getByRole('button', { name: 'Sign Up →' }).click()
        await page.locator("#firstName").type(firstname,{delay:250})
        await page.locator("#lastName").type(lastname.toString(),{delay: 250})
        await page.locator("#Email").type(email,{delay:250})
        await page.locator("#Password").type("wxyz@1234",{delay:250})
        const country = await page.locator(".fieldIcons-input-8z9.items-center.flex select")
        await country.click()
        await country.selectOption("United States")
        await page.waitForTimeout(2000)
        await page.getByLabel("ProJobRoles").selectOption("Commission Stylist")
        await page.waitForTimeout(2000)
        await page.getByLabel("License").type("test123456",{delay:250})
        await page.waitForTimeout(2000)
        await page.locator("#proSchools").selectOption("Paul Mitchell The School Jacksonville")
        await page.waitForTimeout(2000)
        await page.locator("#graduationYear").type("2017",{delay:250})
        await page.waitForTimeout(2000)
        await page.getByRole('button',{name: 'Create Account'}).click()
        await page.waitForTimeout(5000)
    })

    test("Enroll as Pro Reward Member",async()=>{
        await page.locator(".brandMenu-navTriggerIcon-vQl").click()
        await page.goto("https://pro.mcstaging.paulmitchell.com/rewards-application")
        await page.getByPlaceholder("Salon Name").type(lastname+" Saloon")
        await page.locator(".field.field-select").first().selectOption("Salon Owner")
        await page.getByPlaceholder("Referrer's Email Address").type("neelprotest@yopmail.com")
        await page.getByRole('button',{name: 'Next'}).click()
        await page.getByPlaceholder("Salon Street Address").type("10 Ditka Ave,Suite 2500,")
        await page.getByPlaceholder("Unit/Suite").type("Suite 12300")
        await page.getByPlaceholder("City").type("Chicago")
        await page.locator("[name='country']").selectOption("United States")
        await page.locator("[name='salonState']").selectOption("Illinois")
        await page.getByPlaceholder("Zip Code").type("60602")
        await page.getByPlaceholder("Phone Number").type("800-000-0000")
        await page.locator(".field-checkbox").click()
        await page.getByRole('button',{name: 'Next'}).click()

        await page.locator("#address-original-keep").click()
        await page.locator("#distributorId").selectOption("BSG Canada")
        await page.locator("#distributor_account_no").fill(generateRandomNumber(5))
        await page.getByRole('button',{name: 'Next'}).click()
        await page.locator("#brand_cloppity_1").click()
        await page.locator("#brand_cloppity_3").click()
        await page.locator(".submit").click()
        const saloondetails = await page.locator(".salonItem").textContent()
        console.log(saloondetails)
    })

    test("Approve user on backend",async()=>{
        await page.goto("https://mcstaging.paulmitchell.com/admin/admin/")
        await page.locator("#username").fill("neelkmw2")
        await page.locator("#login").fill("wxyz@1234")
        await page.locator(".action-login.action-primary").click()
        expect(page.url()).toContain("https://mcstaging.paulmitchell.com/admin/admin/dashboard/")
        await page.goto("https://mcstaging.paulmitchell.com/admin/salonmembership/jpmssalons/index/")
        await page.getByRole('textbox', { name: 'Search by keyword' }).fill(email)
        await page.getByRole('button', { name: 'Search' }).click()
        //const table_emailid = await page.locator(".data-grid-cell-content").textContent()
        //expect(table_emailid).toContainText(email)
        await page.waitForTimeout(5000)
        await page.getByRole('link', { name: 'Edit' }).click()
        await page.locator("#review_action").selectOption("Approve For Rewards")
        await page.locator("#update_add_note").click()
        const reviewmessage = await page.locator("#review_message").textContent()
        console.log(reviewmessage)
        await page.locator("#save").click()
        await page.waitForTimeout(5000)
    })

    test("Verify Membership Status",async()=>{
        await page.goto("https://pro.mcstaging.paulmitchell.com/")
        await page.locator(".brandMenu-navTriggerIcon-vQl").click()
        await page.getByText("My Account").click()
        await page.locator(".accountMenuItems-menubox-H1v").filter({hasText : "Pro Rewards"}).click()
        const status = await page.locator(".statsHead").textContent()
        console.log(status)
    })

})

export function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

  export function generateRandomNumber(length) {
    const characters = '1234567890';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }