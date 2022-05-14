require('dotenv').config()
const express = require("express")
const { curly } = require('node-libcurl');

const port = process.env.PORT || 3000
const API_KEY = process.env.API_KEY_WEATHER;
const ZIP = process.env.ZIP || 52776;
const DAYS = process.env.DAYS || 4;
//const RETURNFILES =process.env.RETURNFILE.toLowerCase() == 'true'||false
const RETURNFILES =true


const app = express()


app.get('/', async (req,res)=>{
    
    const stringURL='http://api.weatherapi.com/v1/forecast.json?key='+API_KEY+'&q='+ZIP+'&days='+DAYS+'&aqi=no&alerts=no'
    const json =JSON.stringify( await curly.get(stringURL));   
    const obj =JSON.parse(json);

    var actualNumOfDays=0

    var total_C = 0
    var avg_temp_longC=[]
    var total_F = 0
    var avg_temp_longF=[]

    var forecastday=obj.data.forecast.forecastday
   
    for (var i =0; i<forecastday.length;i++) {
       
        total_C+=forecastday[i].day.avgtemp_c
        avg_temp_longC.push(forecastday[i].day.avgtemp_c)

        total_F+=forecastday[i].day.avgtemp_f
        avg_temp_longF.push(forecastday[i].day.avgtemp_f)
        actualNumOfDays++
    }
    res.status(200)
        .attachment(`WeatherReport.json`)
        .send({  avgtemp_c: total_C/actualNumOfDays,
        avgtemp_f:total_F/actualNumOfDays,
        days_inC:avg_temp_longC, 
        days_inF:avg_temp_longF,
        actual_days_of_data:actualNumOfDays,
        ZIP_LOCATION:ZIP
    })

})

app.listen(port, () => console.log(`on port ${port}`))
