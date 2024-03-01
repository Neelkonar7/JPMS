
const {test, expect} = require('@playwright/test')
const login = require('../selectors/userauthentication.json')
const {Authentication} = require('../pageobject/Account')
const cart = require('../selectors/cart.json')
const {Checkout} = require('../pageobject/Checkout')
const {CartPage} = require('../pageobject/CartPage')
const plp_pdp = require('../selectors/PLP_PDP.json')

const exp = require('constants')

test.describe("Smoke Test",async()=>{

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
  
  test("Verify Add Product to Cart", async () => {
    const cartPage = new CartPage(page);
    await cartPage.gotoProductPage(cart.PDP.product_url);
    await cartPage.addToCart();
    await cartPage.verifySuccessMessage(cart.expected_message);
  });
  
  test("Verify Qty can be increased and add Product to Cart", async () =>  {
    const cartPage = new CartPage(page);
    await cartPage.gotoProductPage(cart.PDP.product_url);
    await page.getByRole('textbox', { name: 'Item Quantity' }).fill("3");
    await cartPage.addToCart();
    await cartPage.verifySuccessMessage(cart.expected_message);
    await page.waitForTimeout(5000);
    const value = await page.locator(".item-minicartQuantityChanger-5WB").getByRole('textbox', { name: 'Item Quantity' });
    expect(value).toHaveValue('4');
  });
  
  test.skip("Verify Configurable product to be added to Cart", async () =>  {
    const cartPage = new CartPage(page);
    await cartPage.gotoProductPage(cart.PDP.config_product_prod);
    const select = page.locator(cart.product_variants);
    await select.click();
    await select.selectOption({ index: 2 });
    await cartPage.addToCart();
    await cartPage.verifySuccessMessage(cart.expected_message);
  });

    test("Verify search functionality",async()=>{
        await page.locator(plp_pdp.search_icon).click()
        await page.locator(plp_pdp.search_txtbx).type("Tea Tree")
        await page.keyboard.press('Enter')
        expect(await page.locator(".searchPage-headingHighlight-BYR.font-bold").textContent()).toContain("Tea Tree")
        await page.waitForTimeout(5000)
    })

    test("Verify Checkout process",async()=>{
        const checkoutobj = new Checkout(page)
        await page.locator(cart.minicart_icon).click()
        await page.locator(cart.minicart_icon).click()
        await page.locator(cart.minicart_btn).click()
        expect(page.url()).toContain("paulmitchell.com/cart")
        await page.getByText("Proceed to Checkout").click()
        expect(page.url()).toContain("paulmitchell.com/checkout")
        await checkoutobj.notLoggedinUser()
        await checkoutobj.shippingInformation()
        await checkoutobj.shippingMethod()

    })

    test("Verify Paypal Payment Method",async()=>{
        const checkoutobj = new Checkout(page,context)
        await checkoutobj.payPal()
        await checkoutobj.reviewConfirm()       

    })


})
