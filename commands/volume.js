const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
    const player = message.client.manager.get(message.guild.id);

    if (!player) return message.reply("there is no player for this guild.");
    if (!args.length) return message.reply(`The player volume is \`${player.volume}\`.`)

    const { channel } = message.member.voice;
    
    if (!channel) return message.reply("you need to join a voice channel.");
    if (channel.id !== player.voiceChannel) return message.reply("you're not in the same voice channel.");

    const volume = Number(args[0]);
    
    if (!volume || volume < 1 || volume > 100) return message.reply("You need to give me a volume between 1 and 100.");

    player.setVolume(volume);
    const e = new MessageEmbed()
    .setDescription(`${client.emojis.cache.find(x => x.name === 'verify3')} **Set the player volume to \`${volume}\`.**`)
    .setColor('#010030')
    return message.channel.send(e);
}

exports.help = {
    name:"volume"
}