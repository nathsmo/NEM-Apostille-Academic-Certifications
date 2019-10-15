# IPFS

Ipfs is a distributed file system that seeks to connect all computing devices with the same system of files. In some ways, this is similar to the original aims of the Web, but IPFS is actually more similar to a single bittorrent swarm exchanging git objects. IPFS could become a new major subsystem of the internet. If built right, it could complement or replace HTTP. It could complement or replace even more. 

Download and Install: https://docs.ipfs.io/guides/guides/install/

Initialize: ipfs init   --->> Returns an Address. Useful to determine if the instalation has been done correctly Example: ipfs cat /ipfs/QmS4ustL54uo8FzR9455qaxZwuMiUhyvMcX9Ba8nUH4uVv/readme

GetID: ipfs id

Displays Content: ipfs ls <HashProvided> || ipfs cat /ipfs/<HashProvided>/readme ----> The Hash can be obtained after doing the initialization (init)

# Commands

ipfs add <File> ----> Adds a file to the local node and generate a unique Hash for it.

ipfs cat <File/Hash> ----> Looks for a file and describes it's content. Can also be looked via Hash.

ipfs add -w <File> ----> Adds two hashes per file. One equal to the original one, and a new one containing the information of the wrap.

ipfs add ls -v <Hash> ----> Returns the information of the File.

ipfs pin ls ----> After running the 'Add' Command, the file has been permanently pinned to the local storage. With this command, we can see all of those files.


# Online 

ipfs daemon ----> Initialize the daemon

ipfs cat <Hash> > <Name> ----> Saves the content of a Hash to the File specificed after the '>' sign.

In the Browser you may look for Localhost:8080/ipfs/<Hash> and that will return the content of that Hash

ipfs.io/ipfs/<Hash> Works the same way, just not locally.

ipfs swarm peers ----> Returns all the connected piers.

ipfs id <ID> ----> Inspects a specific ID. Returns it's public key, address, etc.

There's a way to see all of this graphically. Simply look up localhost:5001/webgui


# Securely Add Files 

gpg --gen-key ----> Generates New keys. It will require a Name, a Passphrase and email.

gpg --list-keys ----> Shows available keys

gpg --sign <Document> ----> Signs a document. Asks for passphrase/
	Will generate a file with the same name, but with a .gpg at the end

ipfs add <File.gpg> ----> Adds the encripted file to the node

Decrypt:

gpg --output <FileToGenerate> --decrypt <File.gpg> ----> Decrypts a file.


# Querying DHT 

ipfs dht findprovs <Hash> ----> Returns the DHT of a file providers.

ipfs dht findpeer <ID> ----> Returns the piers of a File.


# BitSwap 

ipfs bitswap wantlist ----> Lists all of the Hashed added with 'ipfs get'

ipfs bitswap ledger <id> ----> Shows piers statistics.


# Mutable Tables with IPNS

ipfs key list ----> Returns available keys

ipfs key gen --type=rsa --size-2048 <Name> ----> Creates a new Key with the name <Name>


To publish a file, first you'll need to add it, then publish:

	ipfs add <File>
	
	ipfs name publish --key=<Key> <HashOfFile>

To verify if it's been correctly published:

	ipfs.io/ipns/<Hash>

!!! Every time you modify the file, you'll need to repeat the whole proccess because the Hash will change.!!!


# References 

https://www.youtube.com/watch?v=GJ2980DWdyc

https://www.youtube.com/watch?v=KIEq2FyMczs

https://docs.ipfs.io/



