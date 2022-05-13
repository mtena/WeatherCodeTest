
const express = require("express")


const app = express()

const port = process.env.PORT || 3000

app.get('/',(req,res)=>{
    res.send(`<h2>Whats UP?${process.env.API_KEY_WEATHER}<\h2>`)
})

app.listen(port, () => console.log(`on port ${port}`))
