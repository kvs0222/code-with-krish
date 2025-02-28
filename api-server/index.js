const express = require('express');
const { getMinNumber, getMaxNumber, getAvarageNumber, getSortedNumbers, getRepititionCount } = require('./utill.js');


const app = new express();
const port = 3080;
const greeting = { message: "min number is " }
app.get('/number/min', (req, res) => {
    const num1 = parseFloat(req.query.num1)
    const num2 = parseFloat(req.query.num2)

    const result = getMinNumber(num1, num2);

    res.json(result)

})

app.get('/number/max', (req, res) => {
    const num1 = parseFloat(req.query.num1)
    const num2 = parseFloat(req.query.num2)

    const result = getMaxNumber(num1, num2);

    res.json(result)
})

app.get('/number/avg', (req, res) => {
    const numbers = req.query.numbers;
    const result = getAvarageNumber(numbers);

    res.json(result)
})

app.get('/number/sort', (req, res) => {
    const queryParam = req.query.numbers;
    const type = (req.query.type);

    const result = getSortedNumbers(queryParam, type);

    res.json(result)
})

app.get('/number/count', (req, res) => {

    const numbers = req.query.numbers;
    const search = (req.query.search);

    const result =getRepititionCount(numbers, search);

    res.json(result)
})

app.listen(port, () => {
    console.log(`server is running on ${port}`);
})