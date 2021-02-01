module.exports = {
    name: "setprefix",
    description: "sets a prefix for one guild",
    permissions: "MANAGE_GUILD",
    execute(message, args, db, prefix) {
        const ps = args[0]
     if(!ps) return message.channel.send("Prefix not specified.").then(m => m.delete({ timeout: 10000 }))
     if(ps.length > 5) return message.channel.send("Prefix should be 5 letters or lower.").then(m => m.delete({ timeout: 10000 }))
     if(ps === prefix) return message.channel.send("That is a setted prefix").then(m => m.delete({ timeout: 10000 }))

     db.set(`guild_${message.guild.id}_prefix`, ps)
     message.channel.send(`Bot prefix setted to ${ps}`)
    }
}