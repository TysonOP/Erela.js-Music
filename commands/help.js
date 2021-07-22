const { MessageEmbed } = require('discord.js');

exports.run = async(client, message, args) => {

    if (args[0]) {
        const command = await client.commands.get(args[0]);
  
        if (!command) {
          return message.channel.send("Unknown Command: " + args[0]);
        }
  
        let embed = new MessageEmbed()
          .setTitle("Thunder bot help")
          .setAuthor(command.name, client.user.displayAvatarURL())
          .setThumbnail(client.user.displayAvatarURL())
          .setColor("#010030")
          .setFooter(`Developed by TYSON`)
  
        return message.channel.send(embed);
      } else {
        const commands = await client.commands;
  
        let embed = new MessageEmbed()
          .setTitle("Thunder bot commands")
          .setColor("#010030")    
          .addField("Information", "`botinfo`")
          .addField("Music", "`play` `pause` `loop` `skip` `stop` `queue` `resume` `volume` `nowplaying` `shuffle` `skipto` `forward` `rewind`")
          .addField("Utilities", "`ping` `help` `invite` `uptime`")
          .addField(`Owner`, '`eval`')
          .setThumbnail(client.user.displayAvatarURL())
          .setFooter(`Developed by TYSON`)
          .setTimestamp();
          
          return message.channel.send(embed);
      }

}

exports.help = {
    name:"help"
}