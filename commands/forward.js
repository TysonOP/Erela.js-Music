const { MessageFlags } = require("discord.js");
const fastForwardNum = 10;

exports.run = async (client, message, args) => {
    const player = message.client.manager.get(message.guild.id);

        if(args[0] && !isNaN(args[0])) {
            if ((player.position + args[0] * 1000) < player.queue.current.duration){
                player.seek(player.position + args[0] * 1000);
                const parsedDuration = client.formatDuration(player.position);
                return message.channel.send({embed : {
                    color: '#000034',
                    description: `Fast-forwarded to \`${parsedDuration}\``
                }});
            }
            else { return message.channel.send(`Cannot forward beyond the song\'s duration.`); }
        }
        else if (args[0] && isNaN(args[0])) { return message.channel.send({ embed : {
            color: '#000034',
            description: `Invalid argument, must be a number.\nCorrect Usage: \`>forward <seconds>\``
        }}); }

        if (!args[0]) {
			if ((player.position + fastForwardNum * 1000) < player.queue.current.duration) {
				player.seek(player.position + fastForwardNum * 1000);
				const parsedDuration = client.formatDuration(player.position);
                return message.channel.send({embed : {
                    color: '#000034',
                    description: `Fast-forwarded to \`${parsedDuration}\``
                }})
			}
            else {
				return message.channel.send({ embed : {
                    color: '#000034',
                    description: `Invalid argument, must be a number.\nCorrect Usage: \`>forward <seconds>\``
                }});
			}
        }
}

exports.help = {
    name:"forward"
}