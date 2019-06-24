const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

        if (!rUser) { return message.channel.send("Couldn't Find The User."); }
        let reason = args.join(" ").slice(22); // since user id is 22 characters long

        let reportEmbed = new Discord.RichEmbed()
            .setDescription("Report")
            .setColor("#FF5546")
            .addField("Reported User", `${rUser} with ID ${rUser.id}`);
        message.channel.send(reportEmbed);
        return;

}

module.exports.help = {
    name: "report"
}