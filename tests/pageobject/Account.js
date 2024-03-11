import { error } from 'console'

const { expect } = require('playwright/test')
const login = require('../selectors/userauthentication.json')

class Authentication{
    constructor(page){
        this.page = page

    }

    async signin(password){
        
        await this.page.locator(login.user_icon).click()
        if(this.page.url() =="https://pro.mcstaging.paulmitchell.com/" )
        {
            var email_id = login.proemailid
        }
        else if(this.page.url()== "https://mcstaging.paulmitchell.com/"){
            var email_id = login.emailid
        }
        else{
            throw error()
        }
        await this.page.locator(login.emailtxtbx).type(email_id, {delay:100})
        await this.page.waitForTimeout(5000)
        await this.page.getByText("Continue").first().click()
        await this.page.locator(login.passwordtxtbx).type(password)
        await this.page.getByText("Continue").first().click()
    }

    async cookiesdisable(){
        await this.page.getByRole('link', { name: 'Cookie Preferences' }).click();
        await this.page.locator('label').filter({ hasText: 'Targeted Advertising' }).locator('span').first().click();
        await this.page.locator('label').filter({ hasText: 'Personalization' }).locator('span').first().click();
        await this.page.locator('label').filter({ hasText: 'Analytics' }).locator('span').first().click();
        await this.page.getByRole('button', { name: 'Save' }).click();
    }

    async donotsellmyinformation(){
        await this.page.getByRole('link' , { name : 'Do Not Sell My Information' }).click()
        await this.page.locator('label').filter({ hasText : 'Do Not Sell or Share My Personal Information'}).locator('span').first().click()
        await this.page.getByRole('button', { name: 'Save' }).click();
    }
    async createnewUser(){
        var firstname = "Neel"
        var lastname = generateRandomString(5)
        var email = firstname+lastname+'@yopmail.com'
        await this.page.locator(login.user_icon).click()
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

    async myAccount(){
        //Use this once the user is loggedin
        await this.page.locator(login.user_icon).click()
        await this.page.getByText("My Account").click()
        await this.page.getByRole('button', { name: 'Account Information' }).click()
        const emailid_underaccount = await this.page.locator(".accountInformationPage-emailValue-Hf4").textContent()
        console.log("Under Account section ID : ",emailid_underaccount)
        if(emailid_underaccount==this.createnewUser)
        {
            console.log("Emails match!");
        }

    }
    async logOut(){
        await this.page.locator(login.user_icon).click()
        await this.page.getByText("My Account").click()
        await this.page.getByRole('button', { name: 'Sign Out' }).click()
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
  
  // Example: Generate a random email with a length of 10 characters
  //const randomEmail = `user${generateRandomString(5)}@example.com`;
  //console.log(randomEmail);

module.exports = {Authentication}