const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const { response } = require('express');
const ObjectId = require('mongodb').ObjectId
require('dotenv').config();
const app = express();
app.use(bodyParser.json());
app.use(cors())
 const uname=process.env.USER_NAME;
 const pass=process.env.PASSWORD;
 const dbname=process.env.DATABASE_NAME1;
 
 
app.get('/',(req,res)=>{
console.log(uname,pass,dbname);
res.send("v")
})

const uri = `mongodb+srv://${uname}:${pass}@cluster0.5av9x.mongodb.net/${dbname}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const servcice = client.db(dbname).collection("services");
    const requestList = client.db(dbname).collection("Request_List");


    app.post('/AddServices', (req, res) => {
        const data= req.body;
        console.log(data);
        servcice.insertOne(data)
          .then(response=>{
              console.log(response);
              res.status(200).send("successfully add")
          })
    

})

    app.get('/getServices', (req, res) => {
        
        const date= req.query.date;
        servcice.find()
         .toArray((err,document)=>{
             res.send(document)
         })
    

})

 app.post('/addVolunteer',(req,res)=>{
     const volunteer = req.body;
     requestList.insertOne(volunteer)
     .then(r=>{
         res.status(200).send("successfully added")
     })
 })
 
 app.get('/getActivityUser',(req,res)=>{
    const email = req.query.email;
    requestList.find({email:email})
    .toArray((err,document)=>{
        res.send(document)
    })
})
app.get('/getActivityAdmin',(req,res)=>{
    
    requestList.find()
    .toArray((err,document)=>{
        res.send(document)
    })
})
app.delete('/delete-activity/:id', (req, res)=> {
    const id= req.params.id
    requestList.deleteOne({_id:ObjectId(id)})
    .then(response=>{
        
        res.send('Got a DELETE request at /user')
    })
    
  })

});

 
app.listen(5000, (req, res) => {
    console.log("app is listening to 5000");
})