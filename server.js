const express = require("express");
const App = express();
const fs = require("fs");
const path = require("path");
const randomizer = require('./randomizer');
//this is important it telss the server to receive a json request
App.use(express.json())
const pathToContent = path.join(__dirname,"content");
const PORT = process.env.PORT||3001;
const portfoliosPath = path.join(pathToContent,'portfolio.json');
const portfolios = JSON.parse(fs.readFileSync(portfoliosPath,'utf-8'));
App.get("/api/blogs",(req,res)=>{
    randomizer();

    console.log("fetching for node")
  const blogsPath = path.join(pathToContent ,'blogs.json');
  const blogs = fs.readFileSync(blogsPath,'utf-8');
  res.send({data:JSON.parse(blogs)})
  

})
App.get("/api/portfolios",(req,res)=>{
    const portfoliosPath = path.join(pathToContent,'portfolio.json');
    const portfolios = fs.readFileSync(portfoliosPath,'utf-8');

    res.send({data:JSON.parse(portfolios)})


   
 })

 App.post("/api/portfolios",(req,res)=>{
  const {companyName}= req.body
 let isPresent=  portfolios.some((portfolio)=>portfolio.name == companyName);
 if(!isPresent){
  portfolios.push(req.body);
  try{
    fs.writeFileSync(portfoliosPath,JSON.stringify(portfolios,null,2));
    res.status(201).send({
      message:"Company Data is saved"
    })
  }catch(er){
    res.status(500).send({
      message:"Not able to save the company"
    })
  }
  
 }else{
  res.status(409).send({
    message:"Company is already saved"
  })
 }



 })

App.listen(PORT,()=>{
    console.log('server is listening to port :3001')
})