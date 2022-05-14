//need to add Docker stuff here.
require('dotenv').config()
const querystring = require("querystring");
//curl functionality 
const { curly } = require('node-libcurl');


//API_KEY test
const API_KEY = process.env.API_KEY_WEATHER;
const ZIP = process.env.ZIP || 52776;
const DAYS = process.env.DAYS || 4;

console.log(API_KEY);

//const { statusCode, data, headers } = await curly.get('http://www.google.com')
myFunction(API_KEY,ZIP,DAYS)

console.log("notBroken");



async function myFunction(API_KEY,ZIP,DAYS) {
    // URL builder would be preferable 
    test()
    const stringURL='http://api.weatherapi.com/v1/forecast.json?key='+API_KEY+'&q='+ZIP+'&days='+DAYS+'&aqi=no&alerts=no'
    console.log(stringURL);
    const json =JSON.stringify( await curly.get(stringURL));   
    //const obj = JSON.parse(json);
    const obj =JSON.parse(json);
    
    var actualNumOfDays=0

    var total_C = 0
    var avg_temp_longC=[]
    var total_F = 0
    var avg_temp_longF=[]

    var forecastday=obj.data.forecast.forecastday
    console.log(forecastday)

    for (var i =0; i<forecastday.length;i++) {
       
        total_C+=forecastday[i].day.avgtemp_c
        avg_temp_longC.push(forecastday[i].day.avgtemp_c)

        total_F+=forecastday[i].day.avgtemp_f
        avg_temp_longF.push(forecastday[i].day.avgtemp_f)
        actualNumOfDays++
    }

    console.log(total_C)
    console.log(total_C/actualNumOfDays)

    console.log(total_F)
    console.log(total_F/actualNumOfDays)

    
    console.log(actualNumOfDays)
    test()  
    }

  function test(){
      console.log('***Not aysic***')
  }