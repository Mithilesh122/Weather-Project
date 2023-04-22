const express=require("express");
const https=require("https");
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");


});
app.post("/",function(req ,res){
console.log("im here");    
const cityName=req.body.cityName;
const appId="93777a505aef927eb76cefe0f61e289e";    
const unit="metric";
const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+appId+"&unit="+unit;
https.get(url,function(response){
    response.on("data",function(data){
     var weatherData=JSON.parse(data);
     const temp=weatherData.main.temp;
     const icon=weatherData.weather[0].icon;
     const imageUrl="https://openweathermap.org/img/wn/"+icon+"@2x.png";
     const desc=weatherData.weather[0].description;
     res.write("<h1>The temparature in "+cityName+ " is:"+temp+"K</h1>");
     res.write("<p>The description of the weather is:"+desc+"</p>");
     res.write("<img src="+imageUrl+"  alt='weather image'>");
     res.send();
     
    });
});
});



app.listen(3000,function(){
    console.log("server started at the port 3000");
});
