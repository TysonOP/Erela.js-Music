const { MessageFlags } = require("discord.js");
const rewindNum = 10;

exports.run = async (client, message, args) => {
    const player = message.client.manager.get(message.guild.id);
		const parsedDuration = client.formatDuration(player.position);
		if(args[0] && !isNaN(args[0])) {
			if((player.position - args[0] * 1000) > 0) {
				player.seek(player.position - args[0] * 1000);
				return message.channel.send({embed: {
					color: '#000034',
					description: `Rewinding to \`${parsedDuration}\``
				}});
			}
			else {return message.channel.send('Cannot rewind beyond 00:00.');}
		}
		else if(args[0] && isNaN(args[0])) {return message.reply(`Invalid argument, must be a number.\nCorrect Usage: \`>forward <seconds>\``);}

		if(!args[0]) {
			if((player.position - rewindNum * 1000) > 0) {
				player.seek(player.position - rewindNum * 1000);
				return message.channel.send({embed: {
					color: '#000034',
					description: `<a:TPRxYes:795237663682461717> Rewinding to \`${parsedDuration}\``
				}});
			}
			else {
				return message.channel.send('Cannot rewind beyond 00:00.');
			}
		}
}

exports.help = {
    name:"rewind"
}