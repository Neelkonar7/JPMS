// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test("get the new window message",async({context,page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    const newwindow = context.waitForEvent('page')
    await page.locator("#openwindow").click()
    const newPage = await newwindow;
    console.log("Parent Window Message ",await page.title())
    console.log("Child Window Message ",await newPage.title())


    const dropdown = await page.locator("#dropdown-class-example")
    //await dropdown.click()
    await dropdown.selectOption("Option1")



})

test.only("",async({page})=>{
  await page.goto("https://www.google.com/")
  await page.locator(".DPXIy").first().type("playwright")
  await page.locator(".gNO89b").first().click()
  await page.waitForSelector("h3");

  const alllinks = await page.$$("a h3")
  for(const all of alllinks){
    console.log(await all.innerText())

  }
})
