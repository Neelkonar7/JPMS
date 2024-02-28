const { expect } = require('playwright/test')
const login = require('../tests/selectors/login.json')

class pwa_account{

    constructor(page){
        this.page = page

    }

    async pwaSignin(password)
    {
        await this.page.locator(".header-mobileMenu-F8F.lg_hidden").click()
        await this.page.getByRole('button', { name: 'Log In / Register' }).click()
        await this.page.locator(login.emailtxtbx).type("neeltest@yopmail.com")
        await this.page.waitForTimeout(5000)
        await this.page.getByText("Continue").first().click()
        await this.page.locator(login.passwordtxtbx).type(password)
        await this.page.getByText("Continue").first().click()
    }

    async pwaLogout(){
        
        await this.page.getByRole('button', { name: 'Sign Out' }).click()
    }
    async pwaMyAccount(){
        //Use this once the user is loggedin
        await this.page.getByRole('button', { name: 'Account Information' }).click()
        const emailid_underaccount = await this.page.locator(".accountInformationPage-emailValue-Hf4").textContent()
        console.log("Under Account section ID : ",emailid_underaccount)
        if(emailid_underaccount==this.pwacreatenewUser)
        {
            console.log("Emails match!");
        }

    }

    async pwacreatenewUser(){
        var firstname = "Neel"
        var lastname = generateRandomString(5)
        var email = firstname+lastname+'@yopmail.com'
        await this.page.locator(".header-mobileMenu-F8F.lg_hidden").click()
        await this.page.getByRole('button', { name: 'Log In / Register' }).click()
        await this.page.getByRole('button', { name: 'Sign Up →' }).click()
        await this.page.locator("#firstName").type(firstname)
        await this.page.locator("#lastName").type(lastname.toString())
        await this.page.locator("#Email").type(email)
        await this.page.locator("#Password").type("wxyz@1234")
        expect(this.page.getByRole('button', {name : 'Create Account'})).toBeVisible()
        await this.page.waitForTimeout(5000)
        await this.page.getByRole('button', {name : 'Create Account'}).click()
        console.log("Created New User : ",email)
        return email
    }

    
}
export function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

  module.exports = {pwa_account}
