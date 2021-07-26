const Discord = require('discord.js')
module.exports = {
    config: {
          name: "muterole",
          description: "Set the slowmode for the channel!",
          aliases: ['mr', "mutedrole"]
    },
  run: async (bot, message, args) => {
      if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(new Discord.MessageEmbed()
    .setColor('RED')
    .setDescription('Only Admins Can Use This Command!')).then(msgdlt => msgdlt.delete({ timeout: 10000 }));
    let settings = args[0]
    if(!settings) return message.channel.send( new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription("Usage is `muterole @role` or `muterole create`"));
//-----------------------------------------------\\      
    if(role){
      role.edit({
      color: "BLACK",
      name: "Muted"
        })
     message.guild.channels.cache.forEach(a => a.createOverwrite(role, {
     SEND_MESSAGES: false
     }));
     message.channel.send( new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription("**Muted Role set as <@&" + role + ">**\nPls Move Muted Role to Top\nAnd Check Role perms"));
    }
//-----------------------------------------------\\      
    if(settings = "create") {
      message.guild.roles.create({ data: { name: "Muted" }}).then(create => {
          create.edit({
      color: "BLACK",
      name: "Muted"
        })
     let role = message.guild.roles.cache.find(r => r.name === "Muted");
     if(!role) return;
     message.guild.channels.cache.forEach(a => a.createOverwrite(role, {
     SEND_MESSAGES: false
     }));
    message.channel.send( new Discord.MessageEmbed()
    .setColor("GOLD")
    .setDescription("**Muted Role Created as <@&" + role + ">**\nPls Move Muted Role to Top\nAnd Check Role perms"));
      })
    }
  },
};