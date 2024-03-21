const {test, expect} = require('@playwright/test')
const login = require('../selectors/userauthentication.json')
const {ddaccount} = require('../pageobject/ddaccount')
const {CartPage} = require('../pageobject/CartPage')
const cart = require('../selectors/cart.json')
const TestcasesExcel = require('../utils/TestcasesExcel')
const {generateRandomName} = require('../utils/generateRandomName')

const SHEET = "Registration";
const videoName = `my_test_video_${Date.now()}.mp4`
test.describe("Login Scenarios",async()=>{
    let page,context
    test.beforeAll(async({browser})=>{
        context = await browser.newContext({
            recordVideo:{
                dir: `videos/Registration/${Date.now()}`,
                name : videoName,
                size:{
                    width: 1920,
                    height: 800
                }
            }
        })
        page = await context.newPage()
        await page.goto("/")
        await page.getByLabel(login.dialog_close).click()
    })

    test.afterAll(async()=>{
        await context.close()
    })

    
    const excelutils = new TestcasesExcel()
    const data1 = excelutils.getTestData(SHEET,"TC01_Create_Account")

    test(`Scenario 1: ${data1.ID}`,async()=>{
        await test.step("RegistrationSteps",async()=>{
            const registration = new ddaccount(page)
            await registration.navigateToCreateAccount()
            var lastname = generateRandomName(5)
            var email = `Neel${lastname}@yopmail.com`
            await registration.userDetails("Neel",lastname,email,data1.Password)
            await registration.registrationSubmit(email)
            await registration.validateAccount(email)
            await page.reload()
            await registration.logOut()    
        })
        
    })

    const data2 = excelutils.getTestData(SHEET,"TC02_Validate_Existing_Email")
    test(`Scenario 2: ${data2.ID}`,async()=>{
        const registration = new ddaccount(page)
            await registration.navigateToCreateAccount()
            await registration.userDetails(data2.FirstName,data2.LastName,data2.Email,data2.Password)
            await registration.registrationSubmit(data2.Email)
            expect(page.locator(".errorMessage-root-uB8 span").textContent()).toContain(data2.Expected_Message)
    })
})


