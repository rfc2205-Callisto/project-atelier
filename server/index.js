const express = require('express');
const axios = require('axios');
const path = require("path");
const config = require("../config.js")

//create server
var app = express();
//set port number
var port = 3000;
//middle ware
app.use(express.json());
app.use(express.static(path.join(__dirname + '/../client/dist')));

app.get("/product", (req, res) => {
  axios.get("https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/products/66666/", {headers: {'Authorization': config.TOKEN}})
    .then((data) => {
      console.log("****data: ", data.data);
      res.send(data.data);
    })
})

app.get("/styles", (req, res) => {
  axios.get("https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/products/66666/styles", {headers: {'Authorization': config.TOKEN}})
    .then((data) => {
      console.log("****data: ", data.data);
      res.send(data.data);
    })
})
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});


