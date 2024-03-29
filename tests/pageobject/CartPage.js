const cart = require('../selectors/cart.json')
const { expect } = require('playwright/test')

class CartPage{

    constructor(page){
        this.page = page
    }

    async gotoProductPage(productUrl) {
        await this.page.goto(productUrl);
    }

    async addToCart() {
        await this.page.locator(cart.cartBtn).click();
        await this.page.waitForSelector(cart.success_addtocartmsg);
    }

    async verifySuccessMessage(expectedMessage) {
        await expect(this.page.locator(cart.success_addtocartmsg)).toHaveText(expectedMessage);
    }

    async miniCart(){
        await this.page.getByRole('button',{name: 'CHECKOUT'}).click()
    }

    async shoppingCart(){
        await this.page.getByText("Proceed to Checkout").click()
    }

}

module.exports = {CartPage}