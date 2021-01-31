const Discord = require('discord.js')
const client = new Discord.Client()
const { MessageEmbed } = require('discord.js')
const fs = require('fs')

client.commands = new Discord.Collection()

const commandfiles = fs.readdirSync('./Bot-Source/').filter(file => file.endsWith('.js'))
for(const file of commandfiles) {
    const command = require(`./Bot-Source/${file}`)
    client.commands.set(command.name, command)
}

const winston = require('winston')
const logger = winston.createLogger({
     	transports: [
     	 		new winston.transports.Console(),
     	 		new winston.transports.File({ filename: 'Discord-bot-Shone-log' }),
     	 	],
     	 	format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`),
     	 	});
     	 	     client.on('ready', () => {
     	 	         logger.log('info', 'I am ready to go.')
     	 	         client.user.setPresence({activity: { name: 'Super Mario Bros 2', type: 'PLAYING' }, status: 'idle'})
            })
     	 	 	  
     	 	 	   client.on('debug', m => logger.log('debug', m))
     	 	 	   client.on('warn', m => logger.log('warn', m))
     	 	 	   client.on('error', m => logger.log('error', m))
     	 	 	   process.on('uncaughtException', error => logger.log('error', error)) 

client.on("message", async message => {
  
    const prefix = db.get(`guild_${message.guild.id}_prefix`) || "."
    if(message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase()
    const member = message.mentions.members.first()
    const reason = args.slice(1).join(" ")
    const Database = require('@replit/database')
    const db = new Database()

   if(!client.commands.has(commandName)) return;
   const command = client.commands.get(commandName)
   
   try {
       command.execute(message, args, member, reason, db)
   } catch (error) {
       console.error(error)
       message.channel.send(`Sorry! There was an error while executing the command! \nError: ${error}`)
   }
   logger.log('info', `${message.author.tag} (${message.author.id}) used ${command} in ${message.guild} (${message.guild.id}).`)
   
   if (command.permissions) {
   const authorPerms = message.channel.permissionsFor(message.author)
   if (!authorPerms || !authorPerms.has(command.permissions)) {
   return message.channel.send('Insufficient permissions')
    
    }
  }
    
})

client.on("message", async message => {
  
   const alexa = require('alexa-bot-api')
   var chatbot = new alexa("aw2plm")
   
    if (message.author.bot) return;
    if (message.content.indexOf('!') === 0) {
        var text = message.content.substring(1);
   const rep = chatbot.getReply(`${text}`, 'automatic')
   message.channel.send(`\`${message.author.username}\` ${rep}`))
    logger.log('info', `${message.author.tag} (${message.author.id}) talked to the bot by excecuting \`${text}\`. I replyed \`${rep}\` .`)
    }
})

client.login(process.env.TOKEN)