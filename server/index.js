const express = require('express');
const axios = require('axios');
const path = require('path');

const config = require('../config.js');

//create server
var app = express();
//set port number
var port = 3000;
//middle ware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/../client/dist')));
// app.use(express.static(__dirname + '/../client/dist'));

app.get('/qa/questions', (req, res) => {
  // console.log(req.query)
  var apiReq = {
    method: 'get',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/qa/questions',
    headers: {
      'Authorization': `${config.TOKEN}`
    },
    params: req.query
  };
  axios(apiReq).then((data) => { res.json(data.data) }).catch(() => { console.log('there is error in api get request') })
})

app.post('/qa/questions', (req, res) => {
  console.log(req.body)
  var apiReq = {
    method: 'post',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/qa/questions',
    headers: {
      'Authorization': `${config.TOKEN}`,
      'Content-Type': 'application/json'
    },
    data: req.body
  };

  axios(apiReq).then((data) => { res.json(data.data) }).catch((err) => { console.log(err.message); })
})

app.post('/qa/questions/:question_id/answers', (req, res) => {

  var apiReq = {
    method: 'post',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/qa/questions/${req.params.question_id}/answers`,
    headers: {
      'Authorization': `${config.TOKEN}`,
      'Content-Type': 'application/json'
    },
    data:JSON.stringify(req.body)
  }

  axios(apiReq).then((data) => { res.json(data) }).catch((err) => { console.log('there is error in api post answer request') })
})

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});


