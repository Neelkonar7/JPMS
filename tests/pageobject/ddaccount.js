const { expect } = require('playwright/test')
const login = require('../selectors/userauthentication.json')
const exp = require('constants')

class ddaccount{
    constructor(page){
        this.page = page
    }

     /**
     * Validate logged in user
     * @param email 
     * @param password
     */

    async login(email , password){
        await this.page.locator(login.user_icon).click()
        await this.page.locator(login.emailtxtbx).type(email, {delay:100})
        await this.page.waitForTimeout(5000)
        await this.page.getByText("Continue").first().click()
        await this.page.locator(login.passwordtxtbx).type(password)
        await this.page.getByText("Continue").first().click()
    }

    /**
     * Validate logged in user
     * @param email 
     */

    async validateAccount(email){
        await this.page.locator(login.user_icon).click()
        await this.page.getByText("My Account").click()
        await this.page.getByRole('button', { name: 'Account Information' }).click()
        const emailid_underaccount = await this.page.locator(".accountInformationPage-emailValue-Hf4").textContent()
        expect(email).toMatch(emailid_underaccount)
    }

     /**
     * Log out of the application
     */

     async logOut(){
        await this.page.locator(login.user_icon).click()
        await this.page.getByText("My Account").click()
        await this.page.getByRole('button', { name: 'Sign Out' }).click()
     }

     /**
      * Navigate to Create Account page
      */

     async navigateToCreateAccount(){
        await this.page.locator(login.user_icon).click()
        await this.page.getByRole('button', { name: 'Sign Up →' }).click()
     }

     /**
      * Enter Details
      * @param firstname
      * @param lastname
      * @param email
      * @param password
      */
     async userDetails(firstname,lastname,email,password){
        await this.page.locator(login.firstname).type(firstname)
        await this.page.locator(login.lastname).type(lastname.toString())
        await this.page.locator(login.signupemail).type(email)
        await this.page.locator(login.passwordtxtbx).type(password)
        return email
     }

     async registrationSubmit(email){
        expect(this.page.getByRole('button', {name : 'Create Account'})).toBeVisible()
        await this.page.waitForTimeout(5000)
        await this.page.getByRole('button', {name : 'Create Account'}).click()
        console.log("Created New User : ",email)
     }
}

module.exports = {ddaccount}