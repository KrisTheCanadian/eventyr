const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");


module.exports.run = async (bot, message, args) => {

    
    if (args[0] === "fetch"){

        const api_call = await fetch(`http://dnd5eapi.co/api/equipment`);
        const data = await api_call.json();
        console.log(data);

    }
    
    return;
}

module.exports.help = {
    name: "equipment"
}