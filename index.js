require('dotenv').config()//required for envirement variables
const express = require("express")//requred for server like behavior 
const { curly } = require('node-libcurl');//required for talking over a network
const app = express()


//accessing env vars for the CURL 
const port = process.env.PORT || 3000
const API_KEY = process.env.API_KEY_WEATHER
const ZIP = process.env.ZIP || 52776
const DAYS = process.env.DAYS || 7


/**
 * Fires when the app is accsessed 
 * returns: JSON file containg weather info 
 */
app.get('/', async (req,res)=>{
    
    //URL creation and CURL command
    const stringURL='http://api.weatherapi.com/v1/forecast.json?key='+API_KEY+'&q='+ZIP+'&days='+DAYS+'&aqi=no&alerts=no'
    const json =JSON.stringify( await curly.get(stringURL))
    
    //Strips the whole JSON response to the forcast
    const obj =JSON.parse(json);
    var forecastday=obj.data.forecast.forecastday

    //loop vars used to calculate avg in C and F units
    var actualNumOfDays=0
    var total_C = 0
    var avg_temp_longC=[]
    var total_F = 0
    var avg_temp_longF=[]
   
    //loops through each forcast day to accsess weather info
    for (var i =0; i<forecastday.length;i++) {
       
        total_C+=forecastday[i].day.avgtemp_c
        avg_temp_longC.push(forecastday[i].day.avgtemp_c)

        total_F+=forecastday[i].day.avgtemp_f
        avg_temp_longF.push(forecastday[i].day.avgtemp_f)
        
        actualNumOfDays++
    }

    //Builds the JSON info and sends the .JSON file back
    res.status(200)
        .attachment(`WeatherReport.json`)
        .send(
            {
            avgtemp_c: total_C/actualNumOfDays,
            avgtemp_f:total_F/actualNumOfDays,
            days_inC:avg_temp_longC, 
            days_inF:avg_temp_longF,
            actual_days_of_data:actualNumOfDays,
            ZIP_LOCATION:ZIP
            })

})

// Keeps the express app listening on 3000 as default
app.listen(port, () => console.log(`on port ${port}`))
