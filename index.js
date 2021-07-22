const config = require("./config.json");
const discord = require("discord.js"); 
const Discord = require('discord.js')
const client = new  discord.Client();
const fs = require("fs"); 
const ms = require('ms')
const db = require('quick.db')
client.queue = new Map();
const mongoose = require('mongoose')
const { ErelaClient } = require('erela.js');
const { Manager, Player } = require("erela.js");
const { MessageEmbed } = require('discord.js');
const delay = ms => new Promise(res => setTimeout(res, ms));
client.embed = MessageEmbed;
client.formatDuration = require("./formatduration")
const pre = require('./models/prefix.js')

mongoose.connect("mongodb+srv://Piyush:KG5EQGjL3GoK0K5j@thundercluster.ui9we.mongodb.net/test?retryWrites=true&w=majority" ,
{useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true}) ;
    mongoose.connection.on("connected" , () => { 
        console.log("MongoDB connected")
    })
client.manager = new Manager({
  nodes: [
  
    {
      host: "localhost",
      port: 2333, 
      password: "youshallnotpass", 
    },
  ],
  send(id, payload) {
    const guild = client.guilds.cache.get(id);
    if (guild) guild.shard.send(payload);
  },
})
  .on("nodeConnect", node => console.log(`Node ${node.options.identifier} connected`))
  .on("nodeError", (node, error) => console.log(`Node ${node.options.identifier} had an error: ${error.message}`))
  .on("trackStart", (player, track) => {
    client.channels.cache
      .get(player.textChannel)
      .send({embed: {
description: `${client.emojis.cache.find(x => x.name === 'music')} **Now playing:** [${track.title}](${track.uri})`,
color: '#010030'
}})

  })
  .on("queueEnd", (player) => {
    client.channels.cache
      .get(player.textChannel)
      .send({embed: {
description: `<a:reddot:776065304602214421> Queue has ended.`,
color: '#010030'
}}); 
delay(10000)
    player.destroy();
  });

client.on("ready" ,() => {
    console.log(client.user.username + " is ready to go !") 
    client.manager.init(client.user.id);
    const types = [
      `WATCHING`,
      `WATCHING`,
      `LISTENING`
      ]
              const activities = [
                  `${config.PREFIX}help | ${config.PREFIX}invite | ${client.users.cache.size} users in ${client.guilds.cache.size.toLocaleString()} servers`,
                  `${client.users.cache.size} users in ${client.guilds.cache.size} servers`,
                  `Developed By Piyush (Tyson)`
              ];

              let i = 0;
              setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, { type: types[i++ % types.length] }), 15000);
});
client.on("raw", (d) => client.manager.updateVoiceState(d));

client.on('message', async (message) => {
    let p = config.PREFIX;
const ress =  await pre.findOne({guildid: message.guild.id})
if(ress && ress.prefix)p = ress.prefix;

  const mentionRegex = RegExp(`^<@!${client.user.id}>$`);
  const mentionRegexPrefix = RegExp(`^<@!${client.user.id}> `);

  if (!message.guild || message.author.bot) return;

  if (message.content.match(mentionRegex)) message.channel.send(`My prefix is \`${p}\` here.`);

})

client.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);
  let jsfiles = files.filter(f => f.split(".").pop() === "js");

  if (jsfiles.length <= 0) return console.log("There are no commands to load...");

  console.log(`Loading ${jsfiles.length} commands...`);
  jsfiles.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${i + 1}: ${f} loaded!`);
    client.commands.set(props.help.name, props);
  });
});

client.on("message", async message => {
  if(message.channel.type === 'dm') return;
  let content = message.content.split(" ");
  let command = content[0];
  let args = content.slice(1);
  let prefix = config.PREFIX;
const res =  await pre.findOne({guildid: message.guild.id})
if(res && res.prefix)prefix = res.prefix;
  if(!command.startsWith(prefix)) return

  let commandfile = client.commands.get(command.slice(prefix.length));
  if(commandfile) commandfile.run(client,message,args);
});


client.login(config.TOKEN)