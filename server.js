var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var mongoose = require('mongoose');
var product = require('./product');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8090;
var router = express.Router();

mongoose.connect('mongodb://localhost:27017/products');


router.use(function (req, res, next) {
    // do logging
    // do authentication
    console.log('Logging of request will be done here');
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/products').post(function (req, res) {
    var p = new product();
    p.title = req.body.title;
    p.price = req.body.price;
    p.instock = req.body.instock;
    p.photo = req.body.photo;
    p.save(function (err) {
        if (err) {
            res.send(err);
        }
        res.send({ message: 'Product Created !' })
    })
}); 

app.use(cors());
app.use('/api', router);
app.listen(port);
console.log('REST API is runnning at ' + port);
