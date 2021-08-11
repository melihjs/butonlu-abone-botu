const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "abone-rol",
    async execute(client, message, args, prefix, perm) {
        var permEmbed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
        .setColor('#5555dd')
        .setTimestamp()
        .setDescription(`:x: Bu komutu kullanabilmek için gerekli yetkin yok!\n\n> Gereken Yetkiler: **${perm}**`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }));
        if (!message.member.permissions.has(perm)) return message.channel.send({ embed: permEmbed });
        var arg = args[0];
        var embeds = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
        .setColor('#5555dd')
        .setTimestamp()
        .setDescription(`:x: Lütfen geçerli bir argüment belirt!\n\n> Argümentler: **ayarla**, **sıfırla**`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }));
        if (!arg) return message.channel.send({ embed: embeds });
        if (arg == "ayarla") {
            var role = message.mentions.roles.first();
            var embeds2 = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setColor('#5555dd')
            .setTimestamp()
            .setDescription(`:x: Lütfen geçerli bir rol etiketle!`)
            .setThumbnail(message.guild.iconURL({ dynamic: true }));
            if (!role) return message.channel.send({ embed: embeds2 });
            var embeds3 = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setColor('#5555dd')
            .setTimestamp()
            .setDescription(`:+1: ${role} abone rolü olarak ayarlandı!`)
            .setThumbnail(message.guild.iconURL({ dynamic: true }));
            client.db.set(`abonerol_${message.guild.id}`, role.id)
            return message.channel.send({ embed: embeds3 });
        } else if (arg == "sıfırla") {
            var embeds4 = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setColor('#5555dd')
            .setTimestamp()
            .setDescription(`:+1: Abone rolü başarıyla sıfırlandı!`)
            .setThumbnail(message.guild.iconURL({ dynamic: true }));
            client.db.delete(`abonerol_${message.guild.id}`)
            return message.channel.send({ embed: embeds4 });
        }
    }
}