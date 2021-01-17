const Discord = require('discord.js')
const client = new Discord.Client()
const { Client, MessageEmbed } = require('discord.js')
const config = require('./config.json')

client.on ('ready', message => { 
    console.log("I am ready to go.");
      client.user.setPresence({activity: { name: 'Super Mario Bros 2', type: 'PLAYING' }, status: 'idle'})
})

//talk commands
client.on("message", message => {
    
    if(message.author.bot) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase()
    const blogchannel = message.guild.channels.cache.get(config.blogchannel)
    
    if (command === "ping") {
        message.channel.send(`Pong! - ${client.ws.ping}ms` ) 
        message.react("")
    }

    if (command === `r1` ) {
        message.delete()
       let rule1embed = new MessageEmbed()
       .setTitle("🔰 **Rule no. 1**")
       .setColor("RANDOM")
       .setDescription("_Spamming is not allowed. Spamming means posting messages continuously without any necessity. Spamming is partially allowed on #chat-with-bots. Spamming may result in warning or a mute or kick._")
       message.channel.send(rule1embed)
    }

    if (command === `r2` ) {
        message.delete()
        let rule2embed = new MessageEmbed()
        .setTitle("🔰 **Rule no. 2**")
        .setColor("RANDOM")
        .setDescription("_Be respectful to server members. insults and escalation of drama will get punished with a temporary mute._")
        message.channel.send(rule2embed)
    }

    if (command === `r3` ) {
        message.delete()
        let rule3embed = new MessageEmbed()
        .setTitle("🔰 **Rule no. 3**")
        .setColor("RANDOM")
        .setDescription("_Use the appropriate channels. if there is no channel for the topic you are looking, go to #casual ._")
        message.channel.send(rule3embed)
    }

    if (command === `r4` ) {
    message.delete()
    let rule4embed = new MessageEmbed()
    .setTitle("🔰 **Rule no. 4**")
    .setColor("RANDOM")
    .setDescription("_Don't use bad words. It will result you in a mute. No exceptions._")
    message.channel.send(rule4embed)
    }
    
    if (command === `r5` ) {
        message.delete()
        let rule5embed = new MessageEmbed()
        .setTitle("🔰 **Rule no. 5**")
        .setColor("RANDOM")
        .setDescription("_Moderators can also mute you for toxic behaviour._")
        message.channel.send(rule5embed)
    }
    
    if (command === `r6` ) {
        message.delete()
        let rule6embed = new MessageEmbed()
        .setTitle("🔰 **Rule no. 6**")
        .setColor("RANDOM")
        .setDescription("_Trying to evade or circumvent any of the rules is same as breaking them. It will result in a mute._")
        message.channel.send(rule6embed)
    }

    if (command === `help` ) {
        message.delete()
        let helpEmbed = new MessageEmbed()
        .setTitle("****Shone-bot Commands****")
        .setThumbnail("https://cdn.glitch.com/6e3cf32a-4f84-49ce-9a12-de76b11f2ef9%2Fdiscord.jpeg?v=1609302395457")
        .setColor("RANDOM")
        .addField("`.ping`", 'Says the pūing. PONG!!')
        .addField("`.r1/2/3/4/5/6`", 'Repeat the rules. dont use continuously, use it when you see someone break the rules.')
        .addField("`.warn`", 'warns a member. Only usable by moderators.')
        .addField("`.kick`", 'kicks the member. Only usable by moderators.')
        .addField("`.ban`", 'bans the member. Only usable by moderators.')
        .addField("`.unwarn`", 'unwarns the member. only usable by moderators.')
        .addField("`!<the sentence or word>`", 'Answers to the sentence by artificial intelligence.')
        .setFooter("This will keep updated.")
        
        message.channel.send(helpEmbed);
        
     }
    
     if (command === `rules` ) {
        message.delete()
        let rulesEmbed = new MessageEmbed()
        .setTitle("****SERVER RULES****")
        .setThumbnail("https://cdn.glitch.com/6e3cf32a-4f84-49ce-9a12-de76b11f2ef9%2Fbot.jpeg?v=1609302989947")
        .setColor("RANDOM")
        .addField("🔰 **Rule no. 1**", '_Spamming is not allowed. Spamming means posting messages continuously without any necessity. Spamming is partially allowed on #chat-with-bots. Spamming may result in warning or a mute or kick._')
        .addField("🔰 **Rule no. 2**", '_Be respectfull to server members. insults and escalation of drama will get punished with a temporary mute._')
        .addField("🔰 **Rule no. 3**", '_Use the appropriate channels. if there is no channel for the topic you are looking in, go to #casual ._')
        .addField("🔰 **Rule no. 4**", '_Do not use bad words. It will result you in a mute. No exceptions._')
        .addField("🔰 **Rule no. 5**", '_Moderators can also mute you for toxic behaviour._')
        .addField("🔰 **Rule no. 6**", '_Trying to evade or circumvent any of the rules is same as breaking them. It will result you in a mute._')
        .setFooter("Please accept the rules. Please dont break them.")
    
          message.channel.send(rulesEmbed);
    }
    
    if (command === "say") {
       message.delete()
         let text = args.join(" ");
        message.channel.send(text); 
    }
    
    if (command === "sps") {
        const options = [
            "stone :shell: ",
            "paper :newspaper2:",
            "scissors :scissors: "
        ]
        const option = options[Math.floor(Math.random() * options.length)]
        message.channel.send(`You got ${option}`)
    }
   
    if (command === "clear") {
       let number = args.join(" ")
       if(!number) return;
       message.channel.bulkDelete(number).catch(console.error)
       message.channel.send(`cleared ${number} messages.`)
   }
//moderation commands
   
   const member = message.mentions.members.first()
   const reason = args.slice(1).join(" ")
   
   if (command === "kick" ) {
    if(!member) return message.channel.send("You didn't mentioned a user to kick!")
     member.kick(reason).then(() => {
              let KickEmbed = new MessageEmbed()
              .setTitle("❌ User kicked")
              .setColor("RANDOM")
              .setDescription(`${member} was kicked by ${message.author}.`)
              message.channel.send(KickEmbed)
              blogchannel.send(KickEmbed)
              })
            }
   
  if (command === "ban" ) {
     if (!member) return message.channel.send("You didn't mentioned a user to ban!")
     member.ban(reason).then(() => {   
              let banEmbed = new MessageEmbed()
              .setTitle("🔒 User Banned")
              .setColor("RANDOM")
              .setDescription(`${member} was banned by ${message.author} with the reason of ${reason}.`)
              message.channel.send(banEmbed)
              logchannel.send(banEmbed)
              blogchannel.send(banEmbed)
           })
  }

  if (command === "warn" ) {
   message.delete()
   const db = require('quick.db')
   if(!message.member.hasPermission("MANAGE_MESSAGES")) 
   return message.channel.send("You dont have the permission to warn anyone").then(msg => {
              					                     msg.delete({ timeout: 10000 })	
              									             })
          if (!member) return;
          if(member.id === message.author.id) return message.channel.send("You cant warn yourself").then(msg => {
              					                     msg.delete({ timeout: 10000 })	
              									             })
          if(member.id === client.user.id) return message.channel.send("You cant warn me").then(msg => {
              					                     msg.delete({ timeout: 10000 })	
              									             })
          db.add(`warn.${member.id}`, 1);
          const data = db.get(`warn.${member.id}`);
      if(data === undefined ) {
        let data = 0
      }
      message.channel.send(`${member} you are warned. Additional infractions may result in a mute. You have ${data} warns.`)
      logchannel.send(`${member} is warned. He have ${data} warns. He is warned by ${message.author}.`)
      blogchannel.send(`${member} is warned. He have ${data} warns. He is warned by ${message.author}.`)

   }
    
   if (command === "unwarn" ) {
   message.delete()
   if(!message.member.hasPermission("MANAGE_MESSAGES")) 
   return message.channel.send("You dont have the permission to unwarn anyone").then(msg => {
              					                     msg.delete({ timeout: 10000 })	
              									             })
           const db = require('quick.db')
          if (!member) return;
          if(member.id === message.author.id) return message.channel.send("You cant unwarn yourself").then(msg => {
              					                     msg.delete({ timeout: 10000 })	
              									             })
          if(member.id === client.user.id) return message.channel.send("You cant unwarn me").then(msg => {
              					                     msg.delete({ timeout: 10000 })	
              									             })
          db.delete(`warn.${member.id}`)
          const data = db.get(`warn.${member.id}`)
          message.channel.send(`${member} is unwarned. 👍`)
          logchannel.send(`${member} is unwarned by ${message.author}.`)
          blogchannel.send(`${member} is unwarned by ${message.author}.`)
     }
    
     if (command === "userlog") {
    if(!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send("Why are you looking other's user log?").then(msg => {
        msg.delete({ timeout: 10000 })
    })
  if (!member) return message.channel.send("User not specified").then(msg => {
      msg.delete({ timeout: 10000 })
  })
   const db = require('quick.db')
   const data = db.get(`warn.${member.id}`)
   let logEmbed = new MessageEmbed()
   .setTitle(`Log of ${member.tag}`)
   .setDescription(`${member} currently have ${data} warns.`)
   .setThumbnail(member.user.displayAvatarURL)
   message.channel.send(logEmbed)
   logchannel.send(`${message.author.tag} used **.userlog** command.`)
   
   }

   if (command === "add") {
        if (!message.member.hasPermission('MANAGE_ROLES'))
            return message.channel.send("Insufficient permissions").then(msg => {
        msg.delete({ timeout: 10000 })
    })
        if (!member)
            return message.channel.send("You have not mentioned a user").then(msg => {
        msg.delete({ timeout: 10000 })
    })
        const addrl = message.mentions.roles.first()
        if (!addrl)
            return message.channel.send("You have not specified a role").then(msg => {
        msg.delete({ timeout: 10000 })
    })
        const roleAdd = message.guild.roles.cache.get(addrl.id)
        if (!roleAdd)
            return message.channel.send("This role does not exist")
        if (member.roles.cache.get(roleAdd.id))
            return message.channel.send(`This user already has the ${addrl} role`)
        member.roles.add(roleAdd.id).then((member) => {
            message.channel.send(`${addrl} added to ${member.displayName}`)
      logchannel.send(`${message.author.tag} added ${addrl} to ${member}.`)
   })
        
   }
    
    if (command === "remove") {
        if (!message.member.hasPermission('MANAGE_ROLES'))
            return message.channel.send("Insufficient permissions").then(msg => {
        msg.delete({ timeout: 10000 })
    })
        if (!member)
            return message.channel.send("You have not mentioned a user").then(msg => {
        msg.delete({ timeout: 10000 })
    })
        const removerl = message.mentions.roles.first()
        if (!removerl)
            return message.channel.send("You have not specified a role").then(msg => {
        msg.delete({ timeout: 10000 })
    })
        const roleRemove = message.guild.roles.cache.get(removerl.id)
        if (!roleRemove)
            return message.channel.send("This role does not exist").then(msg => {
        msg.delete({ timeout: 10000 })
    })
        if (!member.roles.cache.get(roleRemove.id))
            return message.channel.send(`This user does not have the ${removerl} role`)
        member.roles.remove(roleRemove.id).then((member) => {
            message.channel.send(`${removerl} removed from ${member.displayName}`)
        logchannel.send(`${message.author.tag} removed ${removerl} from ${member}.`)
        
        })
    }

    if (command === "mute") {
    if(!member) return message.channel.send("No user mentioned").then(msg => {
        msg.delete({ timeout: 10000 })
    })
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("Insufficient permissions.").then(msg => {
        msg.delete({ timeout: 10000 })
    })
    const muterole = message.guild.roles.cache.get("761507787402379274")
    member.roles.add(muterole).catch(console.error)
    message.channel.send(`${message.author} muted ${member}`)
    logchannel.send(`${message.author.tag} muted ${member} .`)
    blogchannel.send(`${message.author.tag} muted ${member} .`)
     
    }

    if (command === "unmute") {
    let user = message.mentions.users.first()
    let member = message.guild.member(user)
    if(!user) return message.channel.send("No user mentioned").then(msg => {
        msg.delete({ timeout: 10000 })
    })
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("Insufficient permissions")
    const muterole = message.guild.roles.cache.get("761507787402379274")
    member.roles.remove(muterole).catch(console.error)
    message.channel.send(`${message.author} unmuted  ${member}`)
    logchannel.send(`${message.author.tag} unmuted ${member} .`)
    blogchannel.send(`${message.author.tag} unmuted ${member} .`)
  
    }

    if (command === "rolelog") {
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You dont have the permission.").then(msg => {
        msg.delete({ timeout: 10000 })
    })
    let role = message.mentions.roles.first()
    if(!role) return message.channel.send("You didnt mentioned the role.").then(msg => {
        msg.delete({ timeout: 10000 })
    })
    let roleEmbed = new MessageEmbed()
    .setTitle(`Role ${role} details`)
    .setDescription(`**Created at:** ${role.createdAt}\n**Colour:** ${role.hexColor}\n**List of members:** ${role.members}\n**Position:** ${role.position}`)
    message.channel.send(roleEmbed)
      logchannel.send(`${message.author.tag} used **.rolelog** command for searching  ${role}`)
      
      }
}) 

const alexa = require('alexa-bot-api')
var chatbot = new alexa("aw2plm")

client.on("message", async message => {
    if (message.author.bot) return;
    let content = message.content
    if (message.content.indexOf('!') === 0) {
        var text = message.content.substring(1);
    chatbot.getReply(`${content}`, 'automatic').then(r => message.channel.send(r))
    
    }
})

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.get("748464661233532962")
    let welcomeEmbed = new MessageEmbed()
    .setTitle("New Member")
    .setDescription(`Everyone welcome ${member} !  Welcome to the party!`)
    .setColor("RANDOM")
    .setThumbnail(member.user.displayAvatarURL({ size: 2048 }))
    channel.send(welcomeEmbed)
 })


client.login(config.token)

          
            