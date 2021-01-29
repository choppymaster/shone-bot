const Discord = require('discord.js')
const client = new Discord.Client()
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

const fs = require('fs')
client.commands = new Discord.Collection()

const commandfiles = fs.readdirSync('./Bot-Source/').filter(file => file.endsWith('.js'))
for(const file of commandfiles) {
    const command = require(`./Bot-Source/${file}`)
    client.commands.set(command.name, command)
}

client.on ('ready', message => { 
    console.log("I am ready to go.");
      client.user.setPresence({activity: { name: 'Super Mario Bros 2', type: 'PLAYING' }, status: 'idle'})
})

//talk commands
client.on("message", async message => {
  
    const prefix = db.get(`guild_${message.guild.id}_prefix`) || "."
   
    if(message.author.bot) return;
   
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
   
    const commandName = args.shift().toLowerCase()
   
    const blogchannel = message.guild.channels.cache.get(process.env.BLOGCHANNEL)
   
    const logchannel = message.guild.channels.cache.get(process.env.LOGCHANNEL)
    
    const member = message.mentions.members.first()
    
    const reason = args.slice(1).join(" ")
    
   if(!client.commands.has(commandName)) return;
   const command = client.commands.get(commandName)
   
   try {
       command.execute(message, args, member, reason)
   } catch (error) {
       console.error(error)
       message.channel.send(`Sorry! There was an error while executing the command! \nError: ${error}`)
   }
   
   if (command.permissions) {
   const authorPerms = message.channel.permissionsFor(message.author)
   if (!authorPerms || !authorPerms.has(command.permissions)) {
   return message.channel.send('Insufficient permissions')
    
    } 
  }
    
})

client.login(process.env.TOKEN)