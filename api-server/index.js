const express=require('express');
const {getMinNumber}=require('./utill.js');
const {getMaxNumber}=require('./utill.js');
const {getSortedNumbers}=require('./utill.js');
const {getRepititionCount}=require('./utill.js');


const app =new express();
const port = 3080;
const greeting={message: "min number is "}
    app.get('/number/min',(req,res)=>{
    const num1 = parseFloat(req.query.num1)
    const num2 = parseFloat(req.query.num2)

    getMinNumber(num1,num2);

})

app.get('/number/max',(req,res)=>{
    const num1 = parseFloat(req.query.num1)
    const num2 = parseFloat(req.query.num2)

    getMaxNumber(num1,num2);

})

app.get('/number/avg',(req,res)=>{
    const numbers = req.query.numbers;

    getMaxNumber(numbers);

})

app.get('/number/sort',(req,res)=>{
    const queryParam = req.query.numbers;
    const type = (req.query.type);

    getSortedNumbers(queryParam,type);

})

app.get('/number/count',(req,res)=>{

    const numbers =  req.query.numbers;
    const search = (req.query.search);

    getRepititionCount(numbers,search);

})

app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})