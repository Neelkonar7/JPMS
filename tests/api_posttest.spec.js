const {test,expect} = require('@playwright/test');
const exp = require('constants');
const bookingDetails = require('../test_data/bookingData.json')
import {faker} from '@faker-js/faker'
import { randomBytes } from 'crypto';

test("Creating a book",async({request})=>{
    const response = await request.post('https://restful-booker.herokuapp.com/booking',{
        data: bookingDetails
    });

    console.log(await response.json())
    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)

    const responsebody = await response.json()

    expect(responsebody.booking).toHaveProperty("firstname","Neel")
    expect(responsebody.booking).toHaveProperty("lastname", "Konar");
    expect(responsebody.booking).toHaveProperty("totalprice", 111);
    expect(responsebody.booking).toHaveProperty("depositpaid", true);


})

test.only("Creating a book with dyanmic name",async({request})=>{
    const randomfirstName = faker.name.firstName()

    const response = await request.post('https://restful-booker.herokuapp.com/booking',{
        data: {
            "firstname": randomfirstName,
            "lastname": "Konar",
            "totalprice": 111.32,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2023-06-01",
                "checkout": "2023-06-15"
            },
            "additionalneeds": "Breakfast"
        }
    });

    console.log(await response.json())
    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)

    const responsebody = await response.json()

    expect.soft(responsebody.booking).toHaveProperty("firstname",randomfirstName)
    expect(responsebody.booking).toHaveProperty("lastname", "Konar");
    expect.soft(responsebody.booking).toHaveProperty("totalprice", "111");
    expect(responsebody.booking).toHaveProperty("depositpaid", true);


})