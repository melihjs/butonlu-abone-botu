const { MessageEmbed } = require('discord.js');
const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports = {
    name: "abone-ver",
    async execute (client, message, args, prefix, perm) {
        var permEmbed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
        .setColor('#5555dd')
        .setTimestamp()
        .setDescription(`:x: Bu komutu kullanabilmek için gerekli yetkin yok!\n\n> Gereken Yetkiler: **${perm}**`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }));
        if (!message.member.permissions.has(perm)) return message.channel.send({ embed: permEmbed });
        var user = message.mentions.users.first() || client.users.cache.get(args[0]);
        var role = client.db.fetch(`abonerol_${message.guild.id}`);
        var roleNotEmbed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
        .setColor('#5555dd')
        .setTimestamp()
        .setDescription(`:x: Lütfen geçerli bir abone rolü ayarla!`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }));
        var userNotEmbed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
        .setColor('#5555dd')
        .setTimestamp()
        .setDescription(`:x: Lütfen geçerli bir kullanıcı etiketle!`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }));
        if (!role) return message.channel.send({ embed: roleNotEmbed });
        if (!user) return message.channel.send({ embed: userNotEmbed });
        var evethayır = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
        .setColor('#5555dd')
        .setTimestamp()
        .setDescription(`:question: ${user} adlı kullanıcıya abone rolü vermek istediğinden emin misin?`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }));
        var evt = new MessageButton()
        .setStyle('green')
        .setLabel('Evet')
        .setID('evet');
        var hyr = new MessageButton()
        .setStyle('red')
        .setLabel('Hayır')
        .setID('hayır');
        var row = new MessageActionRow()
        .addComponents([evt, hyr]);
        if (!message.member.permissions.has(perm)) {
            evt.setDisabled(true);
            hyr.setDisabled(true);
        };
        return message.channel.send({ embed: evethayır, components: [ row ] }).then(async (s) => {
            var filter = m => m.clicker.user.id == message.author.id;
            var collector = s.createButtonCollector(filter);
            collector.on('collect', async (button) => {
                button.reply.defer();
                if (button.id == "evet") {
                    client.db.add(`toplam_${message.guild.id}`, 1);
                    client.db.set(`abone_${message.guild.id}_${user.id}`, 'Abone');
                    client.db.add(`verme_${message.guild.id}_${message.author.id}`, 1);
                    var mes = `${user.tag} kişisine abone rol verdi.`;
                    client.db.push(`geçmiş_${message.guild.id}_${message.author.id}`, mes);
                    button.guild.members.cache.get(user.id).roles.add(role);
                    var embeds = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                    .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                    .setColor('#5555dd')
                    .setTimestamp()
                    .setDescription(`:+1: ${user} adlı kullanıcıya abone rolü verildi, mesaj siliniyor!`)
                    .setThumbnail(button.message.guild.iconURL({ dynamic: true }));
                    return s.edit({ embed: embeds }).then(async (sm) => {
                        s.delete({ timeout: 5000 });
                    });
                } else if (button.id == "hayır") {
                    var embeds = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                    .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                    .setColor('#5555dd')
                    .setTimestamp()
                    .setDescription(`:x: İşlem iptal edildi, mesaj siliniyor!`)
                    .setThumbnail(button.message.guild.iconURL({ dynamic: true }));
                    return s.edit({ embed: embeds }).then(async (sm) => {
                        s.delete({ timeout: 5000 });
                    });
                }
            });
        });
    }
}