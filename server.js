const express = require("express");
const App = express();
const fs = require("fs");
const path = require("path");
const randomizer = require('./randomizer');
//this is important it telss the server to receive a json request
App.use(express.json())
const pathToContent = path.join(__dirname,"content");
const PORT = process.env.PORT||3001;

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

App.listen(PORT,()=>{
    console.log('server is listening to port :3001')
})