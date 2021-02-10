//import dependencies 

const Discord = require('discord.js')
require('dotenv').config()
const client = new Discord.Client()
const fs = require('fs')
var logger = require("./Bot-Source/logging/logger.js")

// Command handling 
client.commands = new Discord.Collection()

fs.readdirSync("./Bot-Source/").forEach(dir => {
const commandfiles = fs.readdirSync(`./Bot-Source/${dir}`).filter(file => file.endsWith('.js'))
for(const file of commandfiles) {
    const command = require(`./Bot-Source/${dir}/${file}`)
    client.commands.set(command.name, command)
   }
})

client.on('ready', () => {
  logger.log('info', 'I am ready to go.')
  client.user.setPresenc ({activity: { name: 'Super Mario Bros 2', type: 'PLAYING' }, status: 'idle'})
            
})
     	 	 	
     // message things
client.on("message", async message => {
  //message things needed
    const prefix = "."
    if(message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase()
    const member = message.mentions.members.first()
    const reason = args.slice(1).join(" ")
// command
   if(!client.commands.has(commandName)) return;
   const command = client.commands.get(commandName)
   
   try {
       command.execute(message, args, member, reason)
   } catch (error) {
       console.error(error)
       message.channel.send(`Sorry! There was an error while executing the command! \nError: ${error}`)
   }
   logger.log('info', `${message.author.tag} (${message.author.id}) used ${command} in ${message.guild} (${message.guild.id}).`)
   
   // permissions 
   if (command.permissions) {
   const authorPerms = message.channel.permissionsFor(message.author)
   if (!authorPerms || !authorPerms.has(command.permissions)) {
   return message.channel.send('Insufficient permissions')
    
    }
  }

 if (command.guildOnly && message.channel.type === "dm") {
   message.delete()
   return message.channel.send("This command cant be executed in DMs").then(m => m.delete({ timeout: 10000 }))
 }

 if (command.botMaster && message.author.id !== process.env.BOTMASTER) {
   message.delete()
   return message.channel.send("This command is for bot masters only").then(m => m.delete({ timeout: 10000 }))
 }
    
})

// import the token!
client.login(process.env.TOKEN)
