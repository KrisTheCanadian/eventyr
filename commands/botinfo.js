const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    bicon = bot.user.displayAvatarURL;
    botembed = new Discord.RichEmbed()
        .setDescription("Bot Information")
        .setColor("#1e84d4")
        .setThumbnail(bicon)
        .addField("Bot Name", bot.user.username)
        .addField("Bot Created", bot.user.createdAt)

    return message.channel.send(botembed);

}

module.exports.help = {
    name: "botinfo"
}
