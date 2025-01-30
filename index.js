const express = require("express");
const data = require("./data.json")
const app = express();
const path = require("path");
const pathToFile = path.resolve("./data.json");
var cors = require('cors')
const fs = require("fs")

const getResources =()=> JSON.parse(fs.readFileSync(pathToFile));

//this is important it telss the server to receive a json request
app.use(express.json())
const PORT = 3001;

// var corsOption={
//     origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200
// }
// app.use(cors(corsOption))


app.get('/',(req,res)=>{
    res.send({message:"Hello World"})

})


app.get('/api/resources',(req,res)=>{
    res.send(data)
})


app.get('/api/resources/:id',(req,res)=>{
    const resources = getResources();
    let {id} = req.params;
    let resource  = resources.find((resource)=>resource.id== id)

    res.send(resource)
})

app.get('/api/activeResource',(req,res)=>{
    const resources = getResources();
    let a = resources.find((e)=>e.status === "active");
    if(a === undefined){
        res.status(200).send({})
    }
    res.status(200).send(a)
})

app.patch('/api/activeResource',(req,res)=>{
    const resources = getResources();
    let a = resources.map((e)=>{
        if(e.status ==="active"){
            return {...e,
                status:"Complete"
            }
        }
        return e
    });
    fs.writeFile(pathToFile,JSON.stringify(a,null,2),(error)=>{
        if(error){
            res.status(422).send("cant mark complete")
        }
        res.send("marked as complete")

    })

})

app.post('/api/resources',(req,res)=>{
    const resources = getResources();
    console.log(req)
    const resource = req.body;
    resource.createdAt= new Date();
    resource.status ="active"
    resource.id =  Date.now().toString();
    resources.push(resource);
    fs.writeFile(pathToFile ,JSON.stringify(resources,null,2),(error)=>{
        if(error){
            return res.status(422).send(error)
        }
        res.send(resources)
    })
  
})

app.patch('/api/resources/:id',(req,res)=>{
    const resources = getResources();
    let index = resources.findIndex((resource)=> resource.id === req.params.id)
    
 let activeReource=   resources.find(resource=>resource.status === "active");
  if(resources[index].status === "Complete"){
    return res.status(422).send("Cant active  as its already been complete");
  }
resources[index]= req.body

    if (activeReource) {
        if (req.body.status === "active") {
            return res.status(422).send("Cant modify as there is already active resource");
        }
    }
     else {
        if (req.body.status === "active") {
            resources[index].activationTime = new Date()
        }
    }



 

    fs.writeFile(pathToFile,JSON.stringify(resources,null,2),(error)=>{
        if(error){
          return  res.status(422).send(error)
        }

        res.send("saved")

    })

})
app.listen(PORT,()=>{
    console.log('server is listening to port :3001')
})


