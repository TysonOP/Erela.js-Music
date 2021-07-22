const { MessageEmbed } = require("discord.js");
const { players } = require("erela.js");

exports.run = async (client, message, args) => {
    const player = message.client.manager.get(message.guild.id);
    if (!player) return message.reply("There is no player for this guild.");

    const { channel } = message.member.voice;
    if (!channel) return message.reply("you need to join a voice channel.");
    if (channel.id !== player.voiceChannel) return message.reply("You're not in the same voice channel.");

    if (!player.queue.current) return message.reply("There is no music playing.")

    const { title } = player.queue.current;

    player.stop();
    const e = new MessageEmbed()
    .setDescription(`${client.emojis.cache.find(x => x.name === 'skip')} **${title} was skipped.**`)
    .setColor('#010030')
    return message.reply(e);
}

exports.help = {
    name:"skip"
}