const { MessageEmbed } = require('discord.js');
const ms = require('ms');

exports.run = async(client , message ,args ) => {
	const embed = new MessageEmbed()
		.setTitle('Thunder\'s Uptime')
		.setDescription(`My uptime is \`${ms(client.uptime, { long: true })}\``)
		.setColor('#010030')
		message.channel.send(embed);
	}

exports.help = {
	name:"uptime"
}