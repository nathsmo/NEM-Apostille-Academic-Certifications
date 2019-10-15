# NEM-Apostille Academic Certifications
A system that uploads and audits student's academic certifications on the NEM blockchain.
This project uses IPFS for file uploads to the network and reference, NEM blockchain for the audit, Express for the backend endpoint communication and apostille process and MongoDB for localstorage of some assets.

# Temporary intructions to test the proyect for now 

## How does it work:
	- There are two temporary folders: HalfWay and WorkingBackend.
	
## WorkingBackend
	- The WorkingBackend contains a back.js app that when run with `node back.js` after an `npm install` should give you a `http://localhost:3000/` working application. It does have a front-end from where you can see forms that call to nowhere for now. 
	- It works wit express and node js.
	- The working backend part can be called through the endpoint calls. In order for them to work you must:
		* have a file called `test.png` and change the variable `common`, also you can either ask us for the mailtrap.io credentials or make one yourself and input then in the variable.
	- The endpoints are the following. You must call them in this way: http://localhost:3000/ENDPOINT_NAME_HERE
	
	* /addfile - to add the test.png file to the IPFS network
	* /firmas - to send two different emails through mailtrap.io  to the dean and director's email.
	* /request - to send an email to the secretary through mailtrap.io requesting a file upload.
	* /audit - to call the NEM SDK api and proove the test file hash exists and it therefore audited.
	* /create - to create an apostille in the NEM Blockchain of your test.png image.

## HalfWay
	- The HalfWay folder contains a app.js app that when run with `node app.js` after an `npm install` should give you a `http://localhost:3000/` working application. It does have a front-end from where you can see forms that call to nowhere for now. 
	- It works through a JQuery application with node.
	- The HalfWay part can be called through the application directly in the localhost web.
	- The *ingresar* tab is the only one that works sending the data to the database. 
	- The main page guides you through to other tabs.

	
# General instructions (omit for now please)

---
## Requirements

For development, you will only need
* Node js
* Express
* NEM-SDK
* fs
* nodemailer
* path
* ipfs-api
* MongoDB

### Installation
- #### For installation please do:

      $ git clone https://github.com/nathsmo/NEM-Apostille-Academic-Certifications/
      $ cd NEM-Apostille-Academic-Certifications
      $ npm install
      $ npm start

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###
### Manual installation
  If there's any error with the installation please manually run the installation of the previous packages.

---

## Configure app

The following endpoints inside the back.js app need to be changed:

- /getfile 
* validCID
- /audit
* txHash
- /create
* common (cambiar private key y password por las del formulario)

## Running the project

    $ npm start

# IPFS 
--------------------------------------------------

Ipfs is a distributed file system that seeks to connect all computing devices with the same system of files. In some ways, this is similar to the original aims of the Web, but IPFS is actually more similar to a single bittorrent swarm exchanging git objects. IPFS could become a new major subsystem of the internet. If built right, it could complement or replace HTTP. It could complement or replace even more. 

Download and Install: https://docs.ipfs.io/guides/guides/install/

Initialize: ipfs init   --->> Retorna una direccion para poder verificar que la instalacion haya sido correcta. Ejemplo: ipfs cat /ipfs/QmS4ustL54uo8FzR9455qaxZwuMiUhyvMcX9Ba8nUH4uVv/readme

GetID: ipfs id

Display de Contenido: ipfs ls <HashProveido> || ipfs cat /ipfs/<HashProveido>/readme ----> El Hash es obtenido al hacer init.

### Comandos 
------------------------------------------------

ipfs add <Archivo> ----> Agrega un archivo al nodo local y crea un hash unico para ese archivo

ipfs cat <Archivo/Hash> ----> Busca un archivo y describe su contenido. Tambien se puede hacer por hash

ipfs add -w <Archivo> ----> Agrega dos hashes por archivo. Uno igual al primer comando, el segundo contiene la informacion del archivo como wrap.

ipfs add ls -v <Hash> ----> Nos devuelve la informacion del archivo

ipfs pin ls ----> Al usar el comando 'Add' se ha pinneado permanentemente el archivo al storage local. Con este comando, podemos ver todos esos arvhicos.


### Online 
----------------------------------------------------

ipfs daemon ----> Inicializa el daemon

ipfs cat <Hash> > <Nombre> ----> Guarda el contenido de un Hash al archivo especificado luego de '>'

En el Browser se puede poner Localhost:8080/ipfs/<Hash> y eso retorna el contenido del Hash
			     ipfs.io/ipfs/<Hash> Funciona de la misma manera, pero no es local.

ipfs swarm peers ----> Muestra a los nodos que estamos conectados

ipfs id <ID> ----> Inspecciona un ID en especifico. Nos da su Llave Publica, Direcciones, etc

Existe una manera de verlo todo de manera grafica:
	En el Browser, poner localhost:5001/webui y nos desplegara una interfaz grafica con informacion relevante.


### Securely Add Files 
-------------------------------------------

gpg --gen-key ----> Genera Nuevas Llaves. Pedira Nombre, Correo y una Contraseña

gpg --list-keys ----> Muestra las llaves disponibles

gpg --sign <Documento> ----> Firma el Documento. Pide la contraseña creada al generar las llaves
			    Genera un Archivo con el mismo nombre del original, pero con .gpg 

ipfs add <Archivo.gpg> ----> Agrega el archivo encriptado al nodo 


Desencriptar:

gpg --output <ArchivoParaGenerar> --decrypt <Archivo.gpg> ----> Desencripta un Archivo


### Querying DHT 
-------------------------------------------------

ipfs dht findprovs <Hash> ----> Retorna el DHT de los proveedores de un archivo

ipfs dht findpeer <ID> ----> retorna los peers que tienen esos archivos


### BitSwap 
----------------------------------------------------

ipfs bitswap wantlist ----> Una lista de todos los Hash agregados con ipfs get

ipfs bitswap ledger <id> ----> Muestra estadisticas del pier


### Mutable Tables with IPNS 
-----------------------------------------

ipfs key list ----> Devuelve las llaves disponibles

ipfs key gen --type=rsa --size-2048 <Name> ----> crea una llave con el nombre <Name>


Para publicar un archivo, primero hay que agregarlo, luego publicarlo:

	ipfs add <Archivo>
	
	ipfs name publish --key=<Llave> <Hash de Archivo>

Para verificar el archivo publicado, por ejemplo una Pagina Web (Archivo HTML):

	ipfs.io/ipns/<Hash>

!!! Cada vez que querramos actualizar el archivo, hay que repetir el proceso de publicacion ya que cambia el Hash !!!

# NEM SDK
For reference as you look at these links
* https://github.com/QuantumMechanics/NEM-sdk/blob/master/examples/nodejs/apostille/create.js
* https://github.com/QuantumMechanics/NEM-sdk/blob/master/examples/nodejs/apostille/audit.js

### Referencias 
----------------------------------------------------

https://www.youtube.com/watch?v=GJ2980DWdyc

https://www.youtube.com/watch?v=KIEq2FyMczs
