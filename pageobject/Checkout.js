class Checkout{

    constructor(page,context){
        this.page = page
        this.context = context
    }
    async notLoggedinUser(){
        await this.page.locator("#email").fill("neelautotest@yopmail.com")
        await this.page.locator("#firstname").fill("neel")
        await this.page.locator("#lastname").fill("autotest")
    } 

    async shippingInformation(){
        await this.page.getByPlaceholder("Street Address 1").fill("Suite Shots")
        await this.page.getByPlaceholder("City").fill("Fargo")
        const dropdown = this.page.locator("#region-root-1B2")
        await dropdown.click()
        await dropdown.selectOption("North Dakota")
        await this.page.locator("#postcode-root-ttM").fill("58104")
        await this.page.getByPlaceholder("Phone Number").fill("1234567890")
        //await this.page.locator('[type="submit"]').nth(1).click()
        await this.page.getByRole('button',{name: 'Continue to Shipping Method'}).click()
    }
    
    async shippingMethod(){
        await this.page.locator(".shippingRadios-radioLabel-pzL").filter({hasText:'Ground'}).click()
        await this.page.getByRole('button',{name: "Continue to Payment Information"}).click()
    }

    async paymentCreditCard(){
        await this.page.getByText('Credit Card').click()
        await this.page.waitForTimeout(3000)
        await this.page.frameLocator('iframe[name="braintree-hosted-field-cardholderName"]').getByPlaceholder('Cardholder Name').fill('Neel Test')
        await this.page.frameLocator('iframe[name="braintree-hosted-field-number"]').getByPlaceholder('-Digit Number').fill('378282246310005')
        await this.page.frameLocator('iframe[name="braintree-hosted-field-expirationDate"]').getByPlaceholder('MM/YY').fill("02 / 2032")
        await this.page.frameLocator('iframe[name="braintree-hosted-field-postalCode"]').getByLabel('Postal Code').fill('12345')
    }
    
    async payPal(){
        await this.page.locator("#paymentMethod--braintree_paypal").click()
        const promisePage = this.context.waitForEvent('page')
        await this.page.frameLocator(".component-frame.visible").locator(".paypal-button-label-container").click()
        const paypalPage = await promisePage
        await paypalPage.locator("#email").fill("neeltest@yopmail.com")
        await paypalPage.getByRole('button', { name: 'Next' }).click()
        await paypalPage.locator("#password").fill("wxyz@123")
        await paypalPage.locator("#btnLogin").click()
        await paypalPage.locator(".CheckoutButton_buttonWrapper_2VloF").click()
    }
    async reviewConfirm(){
        await this.page.locator('#checkout-review-order').click()
        await this.page.getByRole("button",{name: "Place Order"}).click()
        const order_number = await this.page.locator(".orderConfirmationPage-orderNumber-xzV.orderConfirmationPage-header-P-j.font-semibold").textContent()
        console.log("Order Number",order_number)
    }
    
}

module.exports = {Checkout}