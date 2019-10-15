var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const ipfsAPI = require('ipfs-api');
const fs = require('fs');

//Connceting to the ipfs network via infura gateway
const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})

//Connection to DB 
mongoose.connect('mongodb+srv://faucetAdmin:faucetAdmin1@nemtrack-k57iq.mongodb.net/test?retryWrites=true&w=majority')
// Create a schema (blueprint)

var apostilleSchema = new mongoose.Schema({
    id_orden: String,
    nombre: String,
    apellido: String,
    carnet: String, 
    curso: String,
    link: String, 
    hash_dean: String,
    hash_dir: String, 
    timestamp: String,
    myFile: String
});

var apostilleModel = mongoose.model('apostilleModel', apostilleSchema);


// var data = [{item: 'Get Milk'}, {item: 'Walk'}, {item: 'Kick ass'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
    app.get('/', function(req, res)  {
        res.render('index');
    });

    app.get('/solicitar', function(req, res)  {
        res.render('solicitar');
    });

    //firmas page endpoint
    app.get('/firmar', function(req, res)  {
        res.render('firmar');
    });

    //audit page endpoint
    app.get('/auditar', function(req, res)  {
        res.render('auditar');
    });


    app.get('/ingresar', function(req, res){
        // Recuperar data de mongoDB y pasarla a la vista principal
        // find encontras el que necesitas pasale el que necesitas
        apostilleModel.find({}, function(err, data){
            if(err)throw err;
            res.render('ingresar', {apostilles: data});
        });
    });

    app.post('/ingresar', urlencodedParser,function(req, res){
        console.log(res);
        // Conseguir la data de la vista y agregarla a mongoDB
        var newApostille = apostilleModel(req.body).save(function(err, data){
            if(err) throw err;
            console.log('////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////')
            console.log(data._id)
            res.json(data);
        })

    });

    app.get('/addfile', function(req, res) {
        ipfs.files.add(Buffer("test.png"), function (err, file) {
            if (err) {
              console.log(err);
            }
            console.log(file)
          })
    
    });
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    app.get('/sign', function(req, res){
            res.render('historic')
    });


    app.post('/sign', urlencodedParser,function(req, res){
        apostilleModel.findById(req.body._id, function(err, doxc){
            if(err) throw err;

        });
    });
};


//var id = "5da569993b421376f4a5120b";
//var apostilleModel.findById(id, function (err, doc) { 
//    console.log(doc.nombre)
//} );