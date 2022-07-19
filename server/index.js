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
  // console.log(req.body)
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
    data:req.body
  }
  axios(apiReq).then(() => { res.sendStatus(201)}).catch((err) => { console.log(err) })
});

app.put('/qa/questions/:question_id/helpful',(req,res)=>{
  var apiReq = {
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/qa/questions/${req.params.question_id}/helpful`,
    headers: {
      'Authorization': `${config.TOKEN}`
    }
  }
  axios(apiReq).then(()=>{res.sendStatus(204)}).catch((err) => { throw err})
})
app.put('/qa/answers/:answer_id/helpful',(req,res)=>{
  var apiReq = {
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/qa/answers/${req.params.answer_id}/helpful`,
    headers: {
      'Authorization': `${config.TOKEN}`
    }
  }
  axios(apiReq).then(()=>{res.sendStatus(204)}).catch((err) => { throw err})
})
app.put('/qa/answers/:answer_id/report',(req,res)=>{
  var apiReq = {
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/qa/answers/${req.params.answer_id}/report`,
    headers: {
      'Authorization': `${config.TOKEN}`
    }
  }
  axios(apiReq).then(()=>{res.sendStatus(204)}).catch((err) => { throw err})
})
app.get("/product", (req, res) => {
  axios.get("https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/products/66657/", {headers: {'Authorization': config.TOKEN}})
    .then((data) => {
      res.send(data.data);
    })
})

app.get("/styles", (req, res) => {
  axios.get("https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/products/66657/styles", {headers: {'Authorization': config.TOKEN}})
    .then((data) => {
      res.send(data.data);
    })
})

// Ratings and Reviews Requests:
app.get('/reviews', (req, res) => {
  var options = {
    method: 'get',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/reviews',
    headers: {
      'Authorization': `${config.TOKEN}`
    },
    params: req.query
  };
  axios(options)
    .then((reviews) => {
      res.json(reviews.data)
    })
    .catch((err) => {
      console.log('Serverside Error in Review\'s Get Request', err)
    })
})

app.get('/reviews/meta', (req, res) => {
  var options = {
    method: 'get',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/reviews/meta',
    headers: {
      'Authorization': `${config.TOKEN}`
    },
    params: req.query
  };
  axios(options)
    .then((meta) => {
      res.json(meta.data)
    })
    .catch((err) => {
      console.log('Serverside Error in Review\'s Meta Get Request:', err)
    })
})
app.put('/reviews/help', (req, res) => {
  var options = {
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/reviews/${req.query.review_id}/helpful`,
    headers: {
      'Authorization': `${config.TOKEN}`
    }
  };
  axios(options)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('Serverside Error in Review\'s Helpful Request:', err)
    })
  })

  app.put('/reviews/report', (req, res) => {
    var options = {
      method: 'put',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/reviews/${req.query.review_id}/report`,
      headers: {
        'Authorization': `${config.TOKEN}`
      }
    };
    axios(options)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log('Serverside Error in Review\'s Report Request:', err)
      })
    })

    app.post('/reviews', (req, res) => {
      var data = req.query
      data.product_id = Number(data.product_id);
      data.rating = Number(data.rating);
      data.recommend = Boolean(data.recommend);
      data.characteristics = JSON.parse(data.characteristics);
      var options = {
        method: 'post',
        url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/reviews',
        headers: {
          'Authorization': `${config.TOKEN}`,
        },
        data: data
      };
      axios(options)
        .then(() => {
          res.sendStatus(201);
        })
        .catch((err) => {
          console.log('Serverside Error in Review\'s Post Request:')
        })
      })

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});


