const {test, expect} = require('@playwright/test')

var token

test('should be able to update the booking details',async({request})=>{
    // Create a token to be used in put request
    const response = await request.post('https://restful-booker.herokuapp.com/auth',{
        data: {
            "username": "admin",
            "password": "password123"
        }
    })
    const responsebody = await response.json()
    console.log(responsebody);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    token = responsebody.token
    console.log("New Token is : ", token)


     // PUT

     const updaterequest = await request.put('https://restful-booker.herokuapp.com/booking/1',{
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cookie':  `token=${token}`,
        },
        data: {
            "firstname": "Jim",
            "lastname": "Brown",
            "totalprice": 111,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2023-06-01",
                "checkout": "2023-06-15"
            },
            "additionalneeds": "Breakfast"
        }

     })
    console.log(await updaterequest.json());
    expect(updaterequest.ok()).toBeTruthy();
    expect(updaterequest.status()).toBe(200);
    const updatedResponseBody = await updaterequest.json()
    expect(updatedResponseBody).toHaveProperty("firstname", "Jim");
    expect(updatedResponseBody).toHaveProperty("lastname", "Brown");
    expect(updatedResponseBody).toHaveProperty("totalprice", 111);
    expect(updatedResponseBody).toHaveProperty("depositpaid", true);

})