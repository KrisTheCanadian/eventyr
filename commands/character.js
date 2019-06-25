const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");

module.exports.run = async (bot, message, args) => {

   
    if (args[0] === "create"){

        const api_call = await fetch(`http://dnd5eapi.co/api/races`);
        const data = await api_call.json();
        console.log(data.results);
        const races = data.results;

        message.channel.send('Please select one of the options below:');

        let racesembed = new Discord.RichEmbed()
        .setTitle("Races")
        .setColor("#ADDBD8");
        
        for(var i = 0; i < races.length; i++){

        	racesembed.addField(`${i+1}`, `${races[i].name}`);

        }
        message.channel.send(racesembed);
        message.reply("Enter the race you want to choose: ").then(r => r.delete(15000));
        const filter = m => m.author.id === message.author.id;
        message.channel.awaitMessages(filter,{max: 1, time:15000}).then(collected =>{

        	if(collected.first().content === "cancel" || collected.first().content > races.length){
        		return message.reply("Canceled!");
        	}


        let userRace = collected.first().content;
        console.log(userRace);


        }).catch(err=> {
			message.reply("Time has expired!").then(r => r.delete(5000));   	
        })


    }
    


    return;
}

module.exports.help = {
    name: "character"
}