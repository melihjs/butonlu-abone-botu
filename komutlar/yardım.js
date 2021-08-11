const { MessageEmbed } = require('discord.js');
const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports = {
    name: "yardım",
    async execute(client, message, args, prefix) {
        var toplam_abone = client.db.fetch(`toplam_${message.guild.id}`);
        var embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
        .setColor('#5555dd')
        .setTimestamp()
        .setDescription(`> Sunucuda toplam **${toplam_abone || 0}** abone var!`)
        .addFields(
            {
                name: `:star2: KOMUTLAR`,
                value: `> ${prefix}abone-ver @Üye\n> ${prefix}abone-rol ayarla/sıfırla @Rol\n> ${prefix}abone-sayı @Üye\n> ${prefix}abone-profil @Üye`,
                inline: false
            }
        )
        .setThumbnail(message.guild.iconURL({ dynamic: true }));
        var button = new MessageButton()
        .setStyle('url')
        .setLabel('Discord')
        .setURL('https://discord.gg/delimine');
        var btuton = new MessageButton()
        .setStyle('url')
        .setLabel('Davet')
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`);
        var row = new MessageActionRow()
        .addComponents([button, btuton]);
        return message.channel.send({ embed: embed, components: [row] });
    }
}