const {test , expect} = require('@playwright/test')

test('should be get all the booking details',async({request})=>{
    const response = await request.get('https://restful-booker.herokuapp.com/booking')
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

})

test('should be get specific booking details', async ({ request }) => {
    const response = await request.get(`https://restful-booker.herokuapp.com/booking/1`);
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
});



test('should be able to get subset of booking details using query parameters',async({request})=>{
    const response = await request.get(`https://restful-booker.herokuapp.com/booking`,{
        params: {
            firstname: "Doris",
            lastname: "konar"
        }
    });
    console.log(await response.json())
    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)
})

test.only('should be able to get subset of booking details using query parameters - checkin date example', async ({ request }) => {
    const response = await request.get(`https://restful-booker.herokuapp.com/booking`, {
        params: {
            checkin: "2021-01-15",
            checkout: "2023-03-25"
        },
    });
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
});