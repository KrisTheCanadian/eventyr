const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    if (!args[0] || args[0 == "help"]) return; //should add documentation on the actual use of the command here.



    let sessions = JSON.parse(fs.readFileSync("./sessions.json", "utf8"));

    //start creating session
    if (args[0] === "create")
    {



        let ID = createID();



        sessions[ID] = { //needs to be fixed
            users: [message.author.id]
        };

        

        fs.writeFile("./sessions.json", JSON.stringify(sessions), (err) => {
            if (err) console.log(err)
        });

        return message.reply(`Your Session ID is: ${ID}.`);
    }
    //end creating session

    if (args[0] === "join") {

        if (!sessions[args[1]]) return message.reply(`Enter a valid session number.`);
        else if (!(sessions[args[1]].users.findIndex(user => user === message.author.id) === -1)) return message.reply("You're already part of this group.");
        else
        {
            sessions[args[1]].users.push(message.author.id);

            fs.writeFile("./sessions.json", JSON.stringify(sessions), (err) => {
                if (err) console.log(err)
            });

            return message.reply("You have successfully join the session");
        }

    }



    function createID() {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    

}

module.exports.help = {
    name: "session"
}