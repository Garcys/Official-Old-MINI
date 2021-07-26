const Discord = require('discord.js')
const {MessageEmbed} = require('discord.js')
const db = require('quick.db')
module.exports = {
    config: {
        name: "unmute",
        aliases: ["um"],
        description: "Unmutes a member in the discord!",
        usage: "[name | nickname | mention | ID] <reason> (optional)"
    },
    run: async (bot, message, args) => {
if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send(new Discord.MessageEmbed()
    .setColor('#D32F2F')
    .setTitle('Only Admins Can Use This Command!')).then(msgdlt => msgdlt.delete({ timeout: 10000 }));
    let mutee = message.mentions.members.first();
    let role = message.guild.roles.cache.find(role => role.name === "Muted");
    if(!role) return message.channel.send("This Server Doesnt has a Muted Role!");
    let reason = message.content.split(" ").slice(2).join(" ");
    if(!mutee) return message.channel.send("Pls Tag a **User**!");
    if (!mutee.roles.cache.has(role.id)) return message.channel.send("This User isnt **Muted**!")
    if(!reason) reason = "No Reason Specified!"
    mutee.roles.remove(role).then(() => {
        const embed = new Discord.MessageEmbed()
                 .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                 .setColor("GREEN")
                 .setTitle("User Unmuted")
                 .addField('Unmuted User;', mutee)
                 .addField('Unmuted by', `${message.author.username}#${message.author.discriminator}`)
                 .addField("Reason",`${reason}`)
                 .setTimestamp()
                 message.channel.send(embed)
                })
                .catch(err => {
                  message.reply('**Check my permissions or role position**');
                  // Log the error
                  console.error(err);
                })
            mutee.send(`**Hello, You Have Been Unmuted In ${message.guild.name} for ${reason || "No Reason"}**`).catch(() => null)
            message.channel.send(new Discord.MessageEmbed()
                .setColor("GREEN")
                .setDescription(`${mutee.user.username} was successfully unmuted.`))
    
        let channel = db.fetch(`modlog_${message.guild.id}`)
        if (!channel) return;

        let embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setThumbnail(mutee.user.displayAvatarURL({ dynamic: true }))
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
            .addField("**Moderation**", "unmute")
            .addField("**Unmuted**", mutee.user.username)
            .addField("**Moderator**", message.author.username)
            .addField("**Reason**", `${reason || "**No Reason**"}`)
            .addField("**Date**", message.createdAt.toLocaleString())
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            .setTimestamp();

        var sChannel = message.guild.channels.cache.get(channel)
        if (!sChannel) return;
        sChannel.send(embed)
    }
}
