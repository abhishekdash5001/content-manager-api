/* eslint-disable @typescript-eslint/no-require-imports */
 
const fs = require("fs");
const path = require("path");

const MAX_COUNT = 20;


 function randomizer(){
  
    const blogsPath = path.join(__dirname,"content","blogs.json");
    const content = fs.readFileSync(blogsPath ,'utf-8');
    const blogs  = JSON.parse(content)
    console.log(blogs)
    blogs.forEach(blog=>{
        const randomId = Math.floor(Math.random()*MAX_COUNT);
        blog.id = randomId;
        blog.slug = `some-blog-${randomId}`;
        blog.title = `some blog ${randomId}`
    })
   
    
    fs.writeFileSync(blogsPath,JSON.stringify(blogs,null,2))
}


module.exports = randomizer;
