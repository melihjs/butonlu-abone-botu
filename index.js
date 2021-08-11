const { Client, Collection } = require('discord.js');
const data = require('quick.db');
const fs = require('fs');
const client = new Client();
client.commands = new Collection();
client.events = new Collection();
client.db = data;
client.config = require('./config');
require('discord-buttons')(client);

fs.readdir('./komutlar/', async (err, files) => {
    if (err) throw new Error(err);
    files.forEach(async (dosya) => {
        var file = require(`./komutlar/${dosya}`);
        client.commands.set(file.name, file);
    });
});

fs.readdir('./events/', async (err, files) => {
    if (err) throw new Error(err);
    files.forEach(async (dosya) => {
        var file = require(`./events/${dosya}`);
        client.events.set(file.name, file);
    });
});

client.on('message', m => client.events.get('message').execute(client, m));
client.on('ready', () => client.events.get('ready').execute(client));

client.login(client.config.token);