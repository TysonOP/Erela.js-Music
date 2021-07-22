const { MessageEmbed } = require('discord.js');

exports.run = async(client , message ,args ) => {
    const msg = await message.channel.send(`Pinging..`)

	const latency = msg.createdTimestamp - message.createdTimestamp;
	const choices = ['Is this really my ping?', 'Is this okay? I can\'t look!', 'I hope it isn\'t bad!'];
	const response = choices[Math.floor(Math.random() * choices.length)];

	const embed = new MessageEmbed()
	.setTitle(`:ping_pong: | Pong `)
	.setDescription(`**Bot Latency:** \`${latency}ms\`
	**API Latency:** \`${Math.round(client.ws.ping)}ms\``)
	.setColor('#010030')
	.setTimestamp()

	msg.edit("", embed);
	}

exports.help = {
	name:"ping"
}