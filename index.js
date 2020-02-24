const express = require('express');
const app = express();
const fs = require('fs');

// use midleware function to use req.body
app.use(express.json());


const courses = [
    {id:1,name:'course1'},
    {id:2,name:'course2'},
    {id:3,name:'course3'},
    {id:4,name:'course4'},
];
let recommendations = {};

fs.readFile('recommendations.json','utf8',(err,data)=>{
    if(err) res.send(` can't read json file`);

    const recJson = JSON.parse(data);
    if(!recJson) res.send('no data in json file');

    recommendations = recJson;
    console.log(' ==>');
});


console.log('===>', recommendations);

app.get('/',(req,res)=>{
    res.send('hello there...');
});


app.get('/api/recommendations',(req,res)=>{


   

    res.send(recommendations);
});

app.get('/api/courses/:id',(req,res)=>{
    const course = courses.find(c=> c.id === parseInt(req.params.id));

    if(!course) res.status(404).send('Course not found');
    res.send( course);
});



app.post('/api/course',(req,res)=>{
    const course = {id:courses.length +1,name:req.body.name};
    courses.push(course);
    res.send(course);
});


const port = process.env.PORT || 3000;
app.listen(port,()=> console.log(`listenning on port ${port}`));