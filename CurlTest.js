require('dotenv').config()
const querystring = require("querystring");
//curl functionality 
const { curly } = require('node-libcurl');


//API_KEY test
const API_KEY = process.env.API_KEY_WEATHER;
const ZIP = process.env.ZIP || 52776;
const DAYS = process.env.DAYS || 7;

console.log(API_KEY);

//const { statusCode, data, headers } = await curly.get('http://www.google.com')
myFunction(API_KEY,ZIP,DAYS)
console.log("notBroken");



async function myFunction(API_KEY,ZIP,DAYS) {
    // URL builder would be preferable 
    const stringURL='http://api.weatherapi.com/v1/forecast.json?key='+API_KEY+'&q='+ZIP+'&days='+DAYS+'&aqi=no&alerts=no'
    console.log(stringURL);
    const json =JSON.stringify( await curly.get(stringURL));   
    //const obj = JSON.parse(json);
    const obj =JSON.parse(json);

    for (var key in obj.data.forecast.forecastday) {
        console.log(key)
     }

   // console.log(obj.data.forecast);

  }