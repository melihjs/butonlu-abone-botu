const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "abone-sayı",
    async execute(client, message, args, prefix, perm) {
        var permEmbed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
        .setColor('#5555dd')
        .setTimestamp()
        .setDescription(`:x: Bu komutu kullanabilmek için gerekli yetkin yok!\n\n> Gereken Yetkiler: **${perm}**`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }));
        if (!message.member.permissions.has(perm)) return message.channel.send({ embed: permEmbed });
        var user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        var Geçmiş = client.db.fetch(`geçmiş_${message.guild.id}_${user.id}`);
        if (Geçmiş) {
            var toplam_sayı = client.db.fetch(`verme_${message.guild.id}_${user.id}`);
            var RGeçmiş = Geçmiş.reverse();
            Geçmiş.length = 5;
            var Embed = new MessageEmbed()
            .setAuthor(user.username, user.displayAvatarURL({ dynamic: true }))
            .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setColor('#5555dd')
            .setTimestamp()
            .setDescription(`:star2: Toplam **${toplam_sayı || 0}** kişiye abone rolü vermişsin!\n\n> Son Kayıtlar (Son 5 Kayıt):\n${RGeçmiş.join('\n')}`)
            .setThumbnail(message.guild.iconURL({ dynamic: true }));
            return message.channel.send({ embed: Embed });
        } else {
            var toplam_sayı = client.db.fetch(`verme_${message.guild.id}_${user.id}`);
            var Embed = new MessageEmbed()
            .setAuthor(user.username, user.displayAvatarURL({ dynamic: true }))
            .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setColor('#5555dd')
            .setTimestamp()
            .setDescription(`:star2: Toplam **${toplam_sayı || 0}** kişiye abone rolü vermişsin!\n\n> Son Kayıtlar (Son 5 Kayıt):\nHiç Kayıt Bulunamadı!`)
            .setThumbnail(message.guild.iconURL({ dynamic: true }));
            return message.channel.send({ embed: Embed });
        }
    }
}