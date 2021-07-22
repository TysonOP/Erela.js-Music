const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
    const player = message.client.manager.get(message.guild.id);
    if (!player) return message.reply("there is no player for this guild.");

    const { channel } = message.member.voice;
    
    if (!channel) return message.reply("you need to join a voice channel.");
    if (channel.id !== player.voiceChannel) return message.reply("you're not in the same voice channel.");
    if (player.paused) return message.reply("The player is already paused.");

    player.pause(true);
    const e = new MessageEmbed()
    .setTitle('<:pause:776075749157240852> Paused the player')
    .setColor('#010030')
    return message.reply(e);
}

exports.help = {
    name:"pause"
}