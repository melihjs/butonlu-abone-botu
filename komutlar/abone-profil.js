const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "abone-profil",
    async execute(client, message, args, prefix, perm) {
        var user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        var abone = client.db.fetch(`abone_${message.guild.id}_${user.id}`);
        if (!abone) {
            var embeds = new MessageEmbed()
            .setAuthor(user.username, user.displayAvatarURL({ dynamic: true }))
            .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setColor('#5555dd')
            .setTimestamp()
            .setDescription(`:star2: ${user} ile ilgili bilgiler aşağıda mevcuttur!`)
            .addField("Kullanıcı Adı", user.tag, true)
            .addField("Kullanıcı Id", user.id, true)
            .addField("Abone mi?", "Hayır", true)
            .setThumbnail(message.guild.iconURL({ dynamic: true }));
            return message.channel.send({ embed: embeds });
        } else if (abone == 'Abone') {
            var embeds2 = new MessageEmbed()
            .setAuthor(user.username, user.displayAvatarURL({ dynamic: true }))
            .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setColor('#5555dd')
            .setTimestamp()
            .setDescription(`:star2: ${user} ile ilgili bilgiler aşağıda mevcuttur!`)
            .addField("Kullanıcı Adı", user.tag, true)
            .addField("Kullanıcı Id", user.id, true)
            .addField("Abone mi?", "Evet", true)
            .setThumbnail(message.guild.iconURL({ dynamic: true }));
            return message.channel.send({ embed: embeds2 });
        }
    }
}