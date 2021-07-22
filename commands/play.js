const { MessageEmbed } = require("discord.js");
exports.run = async(client , message ,args) => {
  const msg = message;
    const { channel } = message.member.voice;

    if (!channel) return message.reply('You need to join a voice channel.');
    if (!args.length) return message.reply(`:x: you need to give me a URL or a search term.`);

    const player = message.client.manager.create({
      guild: message.guild.id,
      voiceChannel: channel.id,
      textChannel: message.channel.id,
      selfDeafen: true,
    });

    if (player.state !== "CONNECTED") player.connect();

    const search = args.join(' ');
    let res;

    try {
      res = await player.search(search, message.author);
      if (res.loadType === 'LOAD_FAILED') {
        if (!player.queue.current) player.destroy();
        throw res.exception;
      }
    } catch (err) {
      return message.reply(`There was an error while searching: ${err.message}`);
    }

    switch (res.loadType) {
      case 'NO_MATCHES':
        if (!player.queue.current) player.destroy();
        return message.reply('There were no results found.');
      case 'TRACK_LOADED':
        player.queue.add(res.tracks[0]);

        if (!player.playing && !player.paused && !player.queue.size) player.play();
        return message.reply(`Enqueuing \`${res.tracks[0].title}\`.`);
      case 'PLAYLIST_LOADED':
        player.queue.add(res.tracks);

        if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) player.play();
        return message.reply(`Enqueuing playlist \`${res.playlist.name}\` with ${res.tracks.length} tracks.`);
      case 'SEARCH_RESULT':
        let max = 5, collected, filter = (m) => m.author.id === message.author.id && /^(\d+|end)$/i.test(m.content);
        if (res.tracks.length < max) max = res.tracks.length;


        const results = res.tracks      
            .slice(0, max)
            .map((track, index) => `**${++index}.** [${track.title}](${track.uri})`)
            .join('\n');

        message.channel.send(`**Please select a track between \`1-5\` Number**`, {
embed: {
color: '#010030',
author: {name: '| Track Selection', icon_url: message.author.avatarURL({dynamic: true})},
description: `${results}`
}
});

        try {
          collected = await message.channel.awaitMessages(filter, { max: 1, time: 30e3, errors: ['time'] });
        } catch (e) {
          if (!player.queue.current) player.destroy();
          return message.reply("you didn't provide a selection.");
        }

        const first = collected.first().content;

        if (first.toLowerCase() === 'end') {
          if (!player.queue.current) player.destroy();
          return message.channel.send('Cancelled selection.');
        }

        const index = Number(first) - 1;
        if (index < 0 || index > max - 1) return message.reply(`The number you provided too small or too big (1-${max}).`);

        const track = res.tracks[index];
        player.queue.add(track);

        if (!player.playing && !player.paused && !player.queue.size) player.play();
        return message.reply(`Enqueuing \`${track.title}\`.`);
    }   
}

exports.help = {
  name:"play"
}
