# NEM Apostille Academic Certifications

A system that uploads and audits student's academic certifications on the NEM blockchain.
This project uses IPFS for file uploads to the network and reference, NEM blockchain for the audit, Express for the backend endpoint communication and apostille process, and MongoDB for database storage of some assets.

NEM             |  Apostille 		|  IPFS | UFM
:-------------------------:|:-------------------------:|:-------------------------:|:-------------------------:|
![alt text](https://upload.wikimedia.org/wikipedia/en/1/18/NEM_%28cryptocurrency%29_logo.svg) |   ![Apostille](https://rhizomebrain.net/wp-content/uploads/2017/07/OpenApostille_yoko.png) | ![IPFS](https://upload.wikimedia.org/wikipedia/commons/c/c2/IPFS_logo.png) | ![UFM](https://latinamerica.libertycon.com/wp-content/uploads/2019/01/ufm-logo.ac271a0bf20ec23caaf98a6ecca4a07a58e5590a.png)


---

# Project instructions

## Directories
- The final folder with all the files is called **FinalVersion**, accordinly.
- There are two temporary folders: **HalfWay** and **WorkingBackend**. Those were meant as a half-done project, if you intend on using the final project then please just use the FinalVersion folder and errase all of the other folders.

```bash
.
├── FinalVersion
│   ├── controllers
│   	└── todoController.js
│   ├── node_modules
│   ├── public/assets
│   ├── views
│   	├── auditar.ejs
│   	├── firmar.ejs
│   	├── index.ejs
│   	├── ingresar.ejs
│   	└── logo.png
│   ├── Proyecto - Acceso directo.lnk
│   ├── app.js
│   ├── maildec.html
│   ├── maildir.html
│   ├── package-lock.json
│   └── package.json
├── HalfWay (no longer needed)
├── IPFS (documentation)
├── WorkingBackend (no longer needed)
├── LICENSE
└── README.md
```

## FinalVersion

* This represents the final version of the project, in which the user may **input a document**, **sign it**, and **audit it**. 

### Input Document  ![Input](https://img.icons8.com/cute-clipart/2x/multiple-inputs.png) 

* When the document is entered:
	* it creates a new array of elements within the database
	* it sends the file to ipfs and returns a hask to locate it
	* it sends two emails, and to the dean another to the faculty director so that they can sign the document
	* it creates an order number to reference within the database

### Sign Document ![Sign](https://www.shareicon.net/data/256x256/2016/01/02/697063_document_512x512.png) 

* When the document is signed:
	* it creates a new apostille registry inside the NEM blockchain with the person's credentials (only for the dean and director)
	* it sends a notification that the file has been correctly signed
	* it updates the database on the hash that the NEM blockchain returns

### Audit Document ![Audit](https://www.infidigit.com/wp-content/uploads/2019/05/audit_1.png) 
* When the document is audited:
	* it searches the NEM blockchain to audit the document's hash
	* it confirms the database data
	* it sends the ipfs link to view the document

# FOR INSTALLATION FOLLOW THE GENERAL INSTRUCTIONS THREE SECTIONS BELOW
---	

## WorkingBackend
- The WorkingBackend contains a back.js app that when run with `node back.js` after an `npm install` should give you a `http://localhost:3000/` working application. It does have a front-end from where you can see forms that call to nowhere for now. 
- It works with express and node js.
- The working backend part can be called through the endpoint calls. In order for them to work you must:
		* have a file called `test.png` and change the variable `common`, also you can either ask us for the mailtrap.io credentials or make one yourself and input then in the variable.
- The endpoints are the following. You must call them in this way: http://localhost:3000/ENDPOINT_NAME_HERE
	
	* /addfile - to add the test.png file to the IPFS network
	* /firmas - to send two different emails through mailtrap.io  to the dean and director's email.
	* /request - to send an email to the secretary through mailtrap.io requesting a file upload.
	* /audit - to call the NEM SDK api and proove the test file hash exists and it therefore audited.
	* /create - to create an apostille in the NEM Blockchain of your test.png image.
---
## HalfWay
- The HalfWay folder contains a app.js app that when run with `node app.js` after an `npm install` should give you a `http://localhost:3000/` working application. It does have a front-end from where you can see forms that call to nowhere for now. 
- It works through a JQuery application with node.
- The HalfWay part can be called through the application directly in the localhost web.
- The *ingresar* tab is the only one that works sending the data to the database. 
- The main page guides you through to other tabs.

---
---

# General instructions  ![Instructions](https://livergroup.org/sites/default/files/instructions.png) 
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
  If there's any error with the installation please manually run the installation of the previous packages. Note that using a nodemon makes the debugging and starting of the application easier if you wish to use it.

---

## Configure app ![Configure](https://www.configureone.com/assets/configurations-icon.png) 

The following endpoints inside the controllers folder need to be changed:

- todoController.js
* the user and password for mailtrap.io (this was used for demo sending emails). If you wish to send real emails please refer to a source outside.

## Running the project

    $ npm start

# Information on IPFS 
--------------------------------------------------
![IPFS](https://upload.wikimedia.org/wikipedia/commons/c/c2/IPFS_logo.png) 

* IPFS is a distributed file system that seeks to connect all computing devices with the same system of files. In some ways, this is similar to the original aims of the Web, but IPFS is actually more similar to a single bittorrent swarm exchanging git objects. IPFS could become a new major subsystem of the internet. If built right, it could complement or replace HTTP. It could complement or replace even more. 

Download and Install: https://docs.ipfs.io/guides/guides/install/

Initialize: ipfs init   --->> Retorna una direccion para poder verificar que la instalacion haya sido correcta. Ejemplo: ipfs cat /ipfs/QmS4ustL54uo8FzR9455qaxZwuMiUhyvMcX9Ba8nUH4uVv/readme

GetID: ipfs id

Display de Contenido: ipfs ls <HashProveido> || ipfs cat /ipfs/<HashProveido>/readme ----> El Hash es obtenido al hacer init.

### Commands 
------------------------------------------------

ipfs add <File> ----> Add a file to the local node and create a unique hash for that file

ipfs cat <File/Hash> ----> Search for a file and describe its content. It can also be done by hash

ipfs add -w <File> ----> Add two hashes per file. One equal to the first command, the second contains the information of the file as wrap.

ipfs add ls -v <Hash> ----> Returns file information

ipfs pin ls ----> When using the 'Add' command, the file has been permanently pinned to the local storage. With this command, we can see all those arvhicos.

### Online 
----------------------------------------------------

ipfs daemon ----> Initialize el daemon

ipfs cat <Hash> > <Name> ----> Save the contents of a Hash to the specified file after '>'

On the Browser put Localhost:8080/ipfs/<Hash> and that returns the content the hash refers to 
			     ipfs.io/ipfs/<Hash> Works the same way but its not local
ipfs swarm peers ----> Show the nodes that we are connected

ipfs id <ID> ----> Inspect a specific ID. He gives us his Public Key, Addresses, etc.

There is a way to see everything graphically:
In the Browser, put localhost: 5001 / webui and we will display a graphic interface with relevant information.

# NEM SDK
![NEM](https://upload.wikimedia.org/wikipedia/en/1/18/NEM_%28cryptocurrency%29_logo.svg) 
For reference as you look at these links
* https://github.com/QuantumMechanics/NEM-sdk/

# NEM Apostille SDK documentation
![Apostille](https://rhizomebrain.net/wp-content/uploads/2017/07/OpenApostille_yoko.png) 
For reference as you look at these links
* https://github.com/QuantumMechanics/NEM-sdk/blob/master/examples/nodejs/apostille/create.js

* https://github.com/QuantumMechanics/NEM-sdk/blob/master/examples/nodejs/apostille/audit.js

### External References 
----------------------------------------------------

https://www.youtube.com/watch?v=GJ2980DWdyc

https://www.youtube.com/watch?v=KIEq2FyMczs



## Authors

* **Nathalia Morales** 
* **Yuri Kaffaty** 

See also the list of [contributors](https://github.com/nathsmo/NEM-Apostille-Academic-Certifications/edit/master/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* This project was made specifically for the Blockchain class 2019 and for the UFM. 
