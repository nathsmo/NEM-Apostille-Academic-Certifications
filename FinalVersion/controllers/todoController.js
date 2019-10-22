var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const Swal = require('sweetalert2')
const ipfsAPI = require('ipfs-api');
const nem = require("nem-sdk").default;
const fs = require('fs');
const path = require("path");
const nodemailer = require('nodemailer');






//Connceting to the ipfs network via infura gateway
const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})

// codigo para el sdk de nem
var endpoint = nem.model.objects.create("endpoint")("http://hugetestalice.nem.ninja", nem.model.nodes.defaultPort);

//Reading file from computer
let testFile = fs.readFileSync("test.png");

//Creating buffer for ipfs function to add file to the system
//let testBuffer = new Buffer(testFile);

// Mail tester
var transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
       user: user,
       pass: pass
    }
});

//Connection to DB 
mongoose.connect('mongodb+srv://faucetAdmin:faucetAdmin1@nemtrack-k57iq.mongodb.net/test?retryWrites=true&w=majority')
// Create a schema (blueprint)

var apostilleSchema = new mongoose.Schema({
    id_orden: String,
    nombre: String,
    apellido: String,
    inputcarnet: String, 
    link: String, 
    hash_dean: String,
    hash_dir: String, 
    timestamp: String
});

var apostilles = mongoose.model('apostilles', apostilleSchema);


var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
//main page endpoint
    app.get('/', function(req, res)  {
        res.render('index');

    });


/////////////// Start Ingresar Get y Post ///////////
    app.get('/ingresar', function(req, res)  {
        res.render('ingresar');
    });

    app.post('/ingresar', urlencodedParser, function(req, res) {
        var unique_id;
        function initializeDBInsert() {       
            return new Promise(function(resolve, reject) {
                apostilles(req.body).save(function(err, data){
                    if(err) throw err;
                    resolve(data)
                })
            })
        }

        var initializePromise = initializeDBInsert();
        initializePromise.then(function(result) {
            userDetails = result;
            unique_id = userDetails._id 
            console.log('-------------------------------------------------------------------')
            console.log("Base de datos actualizada con la siguiente informacion: ");
            console.log(userDetails)
            console.log('El numero de seguimiento es el siguiente: ' + unique_id)
            console.log('-------------------------------------------------------------------')

        }, function(err) {
            console.log(err);
        })

        var templatedir = fs.readFileSync('maildir.html',{encoding:'utf-8'});
        var templatedec = fs.readFileSync('maildec.html',{encoding:'utf-8'});

        const mensajeDirector = {
            from: 'certificaciones@ufm.edu', // Sender address
            to: 'director@ufm.edu',         // List of recipients
            subject: 'Firma Certificado | Apostille UFM', // Subject line
            html: templatedir // Plain text body
        };

        const mensajeDecano = {
            from: 'certificaciones@ufm.edu', // Sender address
            to: 'decano@ufm.edu',         // List of recipients
            subject: 'Firma Certificado | Apostille UFM', // Subject line
            html: templatedec // Plain text body
        };

          transport.sendMail(mensajeDecano, function(err, info) {
            if (err) {
              console.log(err)
            } else {
              console.log('Email Enviado al Decano.');
              //console.log(info);
            }
          });

          transport.sendMail(mensajeDirector, function(err, info) {
            if (err) {
              console.log(err)
            } else {
              console.log('Email Enviado al Director.');
              //console.log(info);
            }
          });

    })
    
     //////////////////////////////////////////// Termina Ingresar  ////////////////////////////////////////////

     //////////////////////////////////////////// Empieza Auditar ////////////////////////////////////////////

    app.get('/auditar', function(req, res)  {
        res.render('auditar');
    });

    app.post('/auditar', urlencodedParser, function (req, res) {
        console.log(req.body.inputHash);
            // Transaction hash of the Apostille
        var txHash = req.body.inputHash;
    
        var valid;
        function getValidation() {       
            return new Promise(function(resolve, reject) {
                nem.com.requests.transaction.byHash(endpoint, txHash).then(function(res) {
                    // Verify
                    if (nem.model.apostille.verify("", res.transaction)) {
                    resolve("Apostille is valid");
                    } else {
                        resolve("Apostille is invalid");
                    }
                }, function(err) {
                    resolve("Apostille is invalid");
                    console.log(err);
                });
            })
        }

        var initializePromise = getValidation();
        initializePromise.then(function(result) {
            valid = result;
            console.log('-------------------------------------------------------------------')
            console.log(valid)
            console.log('-------------------------------------------------------------------')
            res.render('auditar', {validation : valid})

        }, function(err) {
            console.log(err);
        })


        // Get the Apostille transaction from the chain
      
    })
      
    //////////////////////////////////////////// Termina Auditar ////////////////////////////////////////////

    //////////////////////////////////////////// Empieza Firmar  ////////////////////////////////////////////
    
    app.get('/firmar', function(req, res)  {
        res.render('firmar');
    });

    //create apostille endpoint
    app.post('/firmar', urlencodedParser, function (req, res, next) {
        console.log(req.body)

        var linkDB;
        function getlinkfromDB() {       
            return new Promise(function(resolve, reject) {
                apostilles.findOne({_id: req.body.numeroorden}, function (err, doc) {
                    if(err) throw err;
                    resolve(doc.link)
                });
            })
        }

        var initializePromise = getlinkfromDB();
        initializePromise.then(function(result) {
            linkDB = result;
            console.log('-------------------------------------------------------------------')
            console.log("El link a la imagen es el siguiente ");
            console.log(linkDB)
            console.log('-------------------------------------------------------------------')
        }, function(err) {
            console.log(err);
        })


        var common = nem.model.objects.create("common")(req.body.password, req.body.privatekey);


        // Create the apostille
        var apostille = nem.model.apostille.create(common, '"'+linkDB+'"', "", req.body.nombrearchivo, nem.model.apostille.hashing["SHA256"], false, "", false, nem.model.network.data.testnet.id);
        var hash;
        function gethash() {       
            return new Promise(function(resolve, reject) {
                nem.model.transactions.send(common, apostille.transaction, endpoint).then(function(res){
                    // If code >= 2, it's an error
                    if (res.code >= 2) {
                        console.error(res.message);
                    } else {
                        console.log("\nTransaction: " + res.message);
                        console.log("\nFor later user create a file with the fileContent text and name it:\n" + apostille.data.file.name.replace(/\.[^/.]+$/, "") + " -- Apostille TX " + res.transactionHash.data + " -- Date DD/MM/YYYY" + "." + apostille.data.file.name.split('.').pop());
                        //console.log("When transaction is confirmed the file should audit successfully in Nano");
                        console.log("\nApostille hash: " + res.transactionHash.data + " for later verification.");
                        resolve(res.transactionHash.data)
                    }
                })
            })
        }


        var initializePromise = gethash();
        initializePromise.then(function(result) {
            hash = result;
            console.log('-------------------------------------------------------------------')
            console.log("El hash generado es");
            res.render('firmar', {link_ : "El hash generado es: " + hash+  " para verificaciones posteriores."})
            console.log(hash)
            console.log('-------------------------------------------------------------------')
        }, function(err) {
            console.log(err);
        })


        // Serialize transfer transaction and announce

    })
    //////////////////////////////////////////// Termina Firmar ////////////////////////////////////////////
};


//var id = "5da569993b421376f4a5120b";
//var apostilleModel.findById(id, function (err, doc) { 
//    console.log(doc.nombre)
//} );