class Cart{

    constructor(page){
        this.page = page
    }

    async miniCart(){
        await this.page.getByRole('button',{name: 'CHECKOUT'}).click()
    }

    async shoppingCart(){
        await this.page.getByText("Proceed to Checkout").click()
    }

}