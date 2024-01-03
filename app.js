const { json } = require('body-parser');
const express = require('express');
const https = require ('https');
const bodyparser= require('body-parser')

const app = express();

app.use(bodyparser.urlencoded({extended:true}));
    
    
app.get('/', (req,res)=>{
    res.sendFile(__dirname +  "/index.html");
    
})
app.post('/',(req,res)=>{
   
const query = req.body.cityname
const apikey = '3bd6ffe3d28078665db760684995a73d'
const  url ='https://api.openweathermap.org/data/2.5/weather?q='+query+'&appid='+apikey+'&units=metric'
https.get(url,(response) =>{
    // console.log(response);
    response.on('data',(data)=>{
       // console.log(data);
      const wheatherData = JSON.parse(data);
      //console.log(wheatherData);
      const temp = wheatherData.main.temp;
      const description = wheatherData.weather[0].description
      res.write("<h1>The Temperature in "+query+" is "+ temp+ "degree celcious</h1>")
      //console.log(description)

      res.write("The weather description is  "+description +"")
    })
})
})


app.listen(3000, ()=> console.log("our server is runing at port 3000"))