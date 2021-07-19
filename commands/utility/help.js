var Discord = require('discord.js')
const fs = require("fs")
const { PREFIX } = require("../../config")
const db = require('quick.db')
const { stripIndents } = require("common-tags");

module.exports = {
	config: {
		name: "help",
		description: "Help Menu",
		usage: "1) m/help \n2) m/help [module name]\n3) m/help [command (name or alias)]",
		example: "1) m/help\n2) m/help utility\n3) m/help ban",
		aliases: ['h']
	},
	run: async (bot, message, args) => {
		let prefix;
		if (message.author.bot || message.channel.type === "dm") return;
		try {
			let fetched = await db.fetch(`prefix_${message.guild.id}`);
			if (fetched == null) {
				prefix = PREFIX
			} else {
				prefix = fetched
			}
		} catch (e) {
			console.log(e)
		};

		if (message.content.toLowerCase() === `${prefix}help`) {
			var log = new Discord.MessageEmbed()
				.setColor(`##000000`)
				.setAuthor("The Help Menu")

				.addField(`** ❯ MODERATION [11]**`, "`Ban`, `Kick`, `lock`, `unlock`, `Unban`,`Mute`, `Purge`, `unmute`")
				.addField(`** ❯ SETUP SYSTEM [4]**`, "`setmodlog`, `membercount`, `setmute`, `slowmode`")
				.addField(`** ❯ MISCELLANEOUS [6]**`, "`help`, `steal`, `uptime`, `av`, `av2`, `stats`")
				.addField(` ** ❯ LINKS [2]**`, `   [Invite Me](https://discord.com/api/oauth2/authorize?client_id=862501211135016970&permissions=4294967031&scope=bot)` + ` - ` + `[Support Server](https://discord.gg/nPSBygs6He)`)
				.setFooter("Upcoming Was Here :3")
				.setTimestamp()

			message.channel.send(log);
		}
	}
}
