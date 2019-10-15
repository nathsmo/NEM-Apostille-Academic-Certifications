//Required modules
const ipfsAPI = require('ipfs-api');
const express = require('express');
const fs = require('fs');
const nem = require("nem-sdk").default;
const nodemailer = require('nodemailer');
const path = require("path");
//app.use(express.urlencoded())

// init app
const app = express();

//puerto de aplicacion
const port = 3000;

//Connceting to the ipfs network via infura gateway
const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})

// codigo para el sdk de nem
var endpoint = nem.model.objects.create("endpoint")("http://hugetestalice.nem.ninja", nem.model.nodes.defaultPort);
var common = nem.model.objects.create("common")("thisissupposedtobeavery1234", "e2531aa8e2dca8d81a797100e913fb152678bddc598b73d47444ddb0a65a3b3e");

let transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
       user: 'cf4bacd1d6c343',
       pass: '22ddf37aeb1cea'
    }
});

const mensajeDecano = {
    from: 'cert@ufm.edu', // Sender address
    to: 'decano@ufm.edu',         // List of recipients
    subject: 'Firma Certificado | Apostille UFM', // Subject line
    html: '<h1> Buenos dias Decano</h1> <h2>Es necesaria su firma y llave privada para la confirmacion de un certificado de notas.</h2> <h3>Att. Certificacion NEM UFM</h3>' // Plain text body
};

const mensajeDirector = {
    from: 'cert@ufm.edu', // Sender address
    to: 'director@ufm.edu',         // List of recipients
    subject: 'Firma Certificado | Apostille UFM', // Subject line
    html: '<h1> Buenos dias Director</h1> <h2>Es necesaria su firma y llave privada para la confirmacion de un certificado de notas.</h2> <h3>Att. Certificacion NEM UFM</h3>' // Plain text body
};





//main page endpoint
app.get('/', function(req, res)  {
    res.sendFile( path.join( __dirname, 'pages', 'index.html' ));
});



//main page endpoint
app.get('/solicitar', function(req, res)  {
    res.sendFile( path.join( __dirname, 'pages', 'solicitar.html' ));
});

//main page endpoint
app.get('/firmar', function(req, res)  {
    res.sendFile( path.join( __dirname, 'pages', 'firmar.html' ));
});

//main page endpoint
app.get('/auditar', function(req, res)  {
    res.sendFile( path.join( __dirname, 'pages', 'auditar.html' ));
});

//main page endpoint
app.get('/ingresar', function(req, res)  {
    res.sendFile( path.join( __dirname, 'pages', 'ingresar.html' ));
});




//create apostille endpoint
app.get('/create', function (req, res, next) {

  // Create the apostille
  var apostille = nem.model.apostille.create(common, "test.png", "", "Test Apostille", nem.model.apostille.hashing["SHA256"], false, "", false, nem.model.network.data.testnet.id);

  // Serialize transfer transaction and announce
  nem.model.transactions.send(common, apostille.transaction, endpoint).then(function(res){
    // If code >= 2, it's an error
    if (res.code >= 2) {
      console.error(res.message);
    } else {
      console.log("\nTransaction: " + res.message);
      console.log("\nFor later user create a file with the fileContent text and name it:\n" + apostille.data.file.name.replace(/\.[^/.]+$/, "") + " -- Apostille TX " + res.transactionHash.data + " -- Date DD/MM/YYYY" + "." + apostille.data.file.name.split('.').pop());
      //console.log("When transaction is confirmed the file should audit successfully in Nano");
      console.log("\nApostille hash: " + res.transactionHash.data + " for later verification.");
    }
  }, function(err) {
    console.error(err);
  });
})





app.get('/audit', function (req, res, next) {

    // Transaction hash of the Apostille
  var txHash = "354fbdb35ad8316e9a0bf036b409a62d5620b25691a4a143d79414e8ca53118d";

  // Get the Apostille transaction from the chain
  nem.com.requests.transaction.byHash(endpoint, txHash).then(function(res) {
    // Verify
    if (nem.model.apostille.verify("", res.transaction)) {
      console.log("Apostille is valid");
    } else {
        console.log("Apostille is invalid");
    }
  }, function(err) {
    console.log("Apostille is invalid");
    console.log(err);
  });
})






app.post('/request', function (req, res, next) {
  console.log(req)
  const messageSecretaria = {
    from: 'cert@ufm.edu', // Sender address
    to: 'secretaria@ufm.edu',         // List of recipients
    subject: 'Verificacion Certificado | Apostille UFM', // Subject line
    html: '<h1> Buenos dias Secretaria,</h1> <h2>Es necesario que verifique un documento de certificado de notas.</h2> <h3>Att. Certificacion NEM UFM</h3>' // Plain text body
};

  const firstname = req.body.inputFirst;
  console.log(firstname);

  transport.sendMail(messageSecretaria, function(err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log('Mensaje enviado a la secretaria.');
      //console.log(info);
    }
  });

})






app.get('/firmas', function (req, res, next) {

  transport.sendMail(mensajeDecano, function(err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log('Enviado al Decano.');
      //console.log(info);
    }
  });

  transport.sendMail(mensajeDirector, function(err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log('Enviado al Director.');
      //console.log(info);
    }
  });

})






//Addfile router for adding file a local file to the IPFS network without any local node
app.get('/addfile', function(req, res) {

    ipfs.files.add(Buffer("test.png"), function (err, file) {
        if (err) {
          console.log(err);
        }
        console.log(file)
      })

})



app.listen(port, function() {
  console.log(`Apostille UFM app listening on port ${port}!`);
});