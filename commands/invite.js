
const { MessageEmbed } = require("discord.js");
const { players } = require("erela.js");

exports.run = async (client, message, args) => {
    const e = new MessageEmbed()
    .setTitle(`${client.user.username}'s Invite Link`)
    .setDescription(`Add me: [https://discord.com/oauth2/authorize?client_id=`+ client.user.id+ `&permissions=8&scope=bot]`(`Invite`))
    .setFooter(`Developed by TYSON`)
}

exports.help = {
    name:"invite"
}