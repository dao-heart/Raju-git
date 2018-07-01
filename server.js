var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
var {mongoose} = require('./database/mongoose');
var {DoctorDetails}=require('./models/doctordetails');
var cors = require('cors');


var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(express.static(path.join(__dirname)));
var corsOptions = {
    origin: true,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    exposedHeaders: ['x-auth-token'],
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
const port= process.env.PORT || 3000;


app.post('/', (req, res) => {
  var doctorlist = new DoctorDetails({
    name: req.body.name,
    gender:req.body.gender,
    field:req.body.field
  });

  doctorlist.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/doctorlist', (req, res) => {
  DoctorDetails.find().then((doctorlist) => {
    res.send({doctorlist});
  }, (e) => {
    res.status(400).send(e);
  })
});

app.get('/doc-prof/:id', (req, res) => {
  DoctorDetails.findById(req.params.id).then((doctorlist) => {
    res.send({doctorlist});
  }, (e) => {
    res.status(400).send(e);
  })
});


app.get('/other-prof/:field', (req, res) => {
field = req.params.field
  console.log("Inside the server->", req.params.field);
  DoctorDetails.find({field:field}).then((doctorlist) => {
    res.send({doctorlist});
  }, (e) => {
    res.status(400).send(e);
  })
});

app.listen(port, () => {
  console.log(`Starting on port ${port}`);
});

module.exports = {app};
