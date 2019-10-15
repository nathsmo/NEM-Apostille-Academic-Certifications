# IPFS

IPFS stands for Interplanetary File System. At its core it is a versioned file system which can store files and track versions over time

IPFS seeks to create a permanent and distributed web. It does this by using a content-addressed system instead of HTTP’s location-based system.

+ An HTTP request would look like http://10.20.30.40/folder/file.txt

+ An IPFS request would look like /ipfs/QmT5NvUtoM5n/folder/file.txt

Instead of using an location address, IPFS uses a representation of the content itself to address the content.

# Implemented in the Project

We decided to use the js-ipfs-http-client, which is a JavaScript API for interacting with a running node.

You may find all of it's own documentation [here](https://www.github.com/ipfs/js-ipfs-http-client)

# Run this comands to Initialize and Install the required libraries.

Initialize NPM. You will need to specify things such as version, Author, name, etc.

```
npm init
```

Install the requires libraries:

```
npm install ipfs-http-client ejs express express-fileupload body-parser
```
