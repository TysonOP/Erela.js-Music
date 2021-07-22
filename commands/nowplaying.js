const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags")
const moment = require("moment")
require("moment-duration-format")(moment);

exports.run = async (client, message, args) => {
    const formatTime = require("../formattime");

        const bot = client;
        const player = message.client.manager.get(message.guild.id);
        const currentTime = player.position;
        const trackLength = player.queue.current.duration;
        const timeDisplay = `\`${moment.duration(currentTime, "milliseconds").format()}/${moment.duration(trackLength, "milliseconds").format()}\``;
        const timeBar = "━".repeat(30).split("");
 
        for (let i = 0; i < timeBar.length; i++) {
          // Multiply len by the pattern length to get the right rate to change the dot's positon. Defaults to 1.
          if (i === timeBar.length - 1 || i === Math.round((30 * currentTime) / trackLength)) {
            timeBar.splice(i, 1, "🔘"); // Replace the character at this index with the dot to visualize the player's current position.
            break;
          }
        }
    
        if (!player || !player.queue.current)return message.channel.send({embed: {description: "No song currently playing in this guild", color: "#000034"}})


        const { title, author, duration, thumbnail, requester } = player.queue.current;
        let amount = `${client.formatDuration(player.position, true)}`
        const part = Math.floor((player.position / duration) * 10);
        const embed = new MessageEmbed()

            .setAuthor("Current Song Playing.", message.author.displayAvatarURL())

            .setThumbnail(thumbnail)

            .setDescription(stripIndents`
            **${player.playing ? "▶️" : "⏸️"} Currently Playing**: [${player.queue.current.title}](${player.queue.current.uri})\n\n${"▬".repeat(part) + "🔘" + "▬".repeat(10 - part)} \`[${amount} / ${client.formatDuration(duration, true)}]\``)
            .addField("Requested By", requester)
            .setColor("#000034")

        return message.channel.send(embed).catch(err => message.channel.send(err))
}

exports.help = {
    name:"nowplaying"
}