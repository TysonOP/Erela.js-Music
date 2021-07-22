const discord = require('discord.js');
const ms = require('ms');

  exports.run = async (client, message, args) => {
    const bot = client;
        const voiceChannel = message.member.voice.channel;

        const player = message.client.manager.get(message.guild.id);

        if(!player) return message.channel.send({embed: {description: "No song currently playing in this guild", color: "#000034"}})

        if(!voiceChannel) return message.channel.send("You need to be in a voice channel to use the shuffle command.");
player.queue.shuffle()
return message.react("🔁")
  }

  exports.help = {
      name:"shuffle"
  }