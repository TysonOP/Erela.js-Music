const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
    const player = message.client.manager.get(message.guild.id);
    if (!player) return message.reply("there is no player for this guild.");

    const { channel } = message.member.voice;
    
    if (!channel) return message.reply("you need to join a voice channel.");
    if (channel.id !== player.voiceChannel) return message.reply("you're not in the same voice channel.");
    
    player.destroy();
    const e = new MessageEmbed()
    .setDescription(`<a:bell:776063837618044928> **Destroyed the song and left the voice channel.**`)
    .setColor('#010030')
    return message.reply(e);
}

exports.help = {
    name:"stop"
}