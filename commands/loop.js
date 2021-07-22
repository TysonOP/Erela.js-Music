const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
    const player = message.client.manager.get(message.guild.id);
    if (!player) return message.reply("there is no player for this guild.");

    const { channel } = message.member.voice;
    
    if (!channel) return message.reply("you need to join a voice channel.");
    if (channel.id !== player.voiceChannel) return message.reply("you're not in the same voice channel.");
    
    if (args.length && /queue/i.test(args[0])) {
      player.setQueueRepeat(!player.queueRepeat);
      const queueRepeat = player.queueRepeat ? "Enabled" : "Disabled";
      const e = new MessageEmbed()
      .setDescription(`${client.emojis.cache.find(x => x.name === 'TPRxYes')} **${queueRepeat} queue repeat.**`)
      .setColor('#01003')
      return message.reply(e);
    }

    player.setTrackRepeat(!player.trackRepeat);
    const trackRepeat = player.trackRepeat ? "Enabled" : "Disabled";
    const e1 = new MessageEmbed()
    .setDescription(`${client.emojis.cache.find(x => x.name === 'TPRxYes')} **${trackRepeat} track repeat.**`)
    .setColor('#010030')
    return message.reply(e1);
}

exports.help = {
    name:"loop"
}