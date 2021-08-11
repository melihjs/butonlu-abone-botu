const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "message",
    async execute(client, message) {
        var prefix = client.config.prefix;
        if (message.author.bot) return;
        if (message.content.indexOf(prefix) !== 0) return;
        if (!message.guild) return;
        var args = message.content.slice(prefix.length).trim().split(/ +/g);
        var command = args.shift();
        var cmd = client.commands.get(command);
        if (!cmd) return;
        var perm = "MANAGE_GUILD";
        cmd.execute(client, message, args, prefix, perm);
    }
}