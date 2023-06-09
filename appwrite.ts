import { Account, Client, Databases,Storage,ID } from 'appwrite';
const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('648090906e85c2410f16');    
const account = new Account (client)
const databases = new Databases(client)
const storage = new Storage(client)

export {client , account , databases,storage, ID }