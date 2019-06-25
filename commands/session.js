const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    if (!args[0] || args[0 == "help"]) return; //should add documentation on the actual use of the command here.



    let sessions = JSON.parse(fs.readFileSync("./sessions.json", "utf8"));

    //start creating session
    if (args[0] === "create") {



        let ID = createID();


        if (args[1] === "private") {
            sessions[ID] = { //needs to be fixed
                private: true,
                users: [message.author.id],
                invited: [null]
            };
        }
        else {
            sessions[ID] = { //needs to be fixed
                private: false,
                users: [message.author.id],
                invited: [null]
            };
        }




        fs.writeFile("./sessions.json", JSON.stringify(sessions), (err) => {
            if (err) console.log(err)
        });

        return message.reply(`Your Session ID is: ${ID}.`);
    }
    //end creating session

    //start joinning session 
    else if (args[0] === "join") {

        if (!sessions[args[1]]) return message.reply(`Enter a valid session number.`);
        else if (!(sessions[args[1]].users.findIndex(user => user === message.author.id) === -1)) return message.reply("You're already part of this session.");
        else if (!sessions[args[1]].private) {
            sessions[args[1]].users.push(message.author.id);

            fs.writeFile("./sessions.json", JSON.stringify(sessions), (err) => {
                if (err) console.log(err)
            });

            return message.reply("You have successfully join the session");
        }
        else {
            if (!(sessions[args[1]].invited.findIndex(user => user === message.author.id) === -1)) {

                delete sessions[args[1]].invited[sessions[args[1]].invited.findIndex(user => user === message.author.id)];

                sessions[args[1]].users.push(message.author.id);

                fs.writeFile("./sessions.json", JSON.stringify(sessions), (err) => { if (err) console.log(err) });

                return message.reply("You have accepted the invitation");
            }
            return message.reply("This session is set to private. You need to be invited to the session.");
        }
    }
    //end of joinning session


    else if (args[0] === "leave") {

        if (!sessions[args[1]]) return message.reply(`Enter a valid session number.`);
        else if (!(sessions[args[1]].users.findIndex(user => user === message.author.id) === -1)) {

            delete sessions[args[1]].users[sessions[args[1]].users.findIndex(user => user === message.author.id)];

            //deletes session if no more users
            if (sessions[args[1]].users[0] === null) {
                delete sessions[args[1]];
            }

            fs.writeFile("./sessions.json", JSON.stringify(sessions), (err) => { if (err) console.log(err) });

            return message.reply("You have successfully left the group");
        }
        else { return message.reply("You are not part of that session."); }

    }

    //setting session to private start
    else if (args[0] === "toggle") {
        if (!sessions[args[1]]) return message.reply(`Enter a valid session number.`);
        else if (!(sessions[args[1]].users.findIndex(user => user === message.author.id) === -1)) {

            if (sessions[args[1]].private) {
                sessions[args[1]].private = false;
            }
            else {
                sessions[args[1]].private = true;
            }

            fs.writeFile("./sessions.json", JSON.stringify(sessions), (err) => { if (err) console.log(err) });

            return message.reply(`The session privacy is set to: ${sessions[args[1]].private}`);
        }
        else { return message.reply("You are not part of that session."); }
    }

    //start of invite command
    else if (args[0] === "invite") {

        let invitor = message.author.username;
        let sessionid = args[2];
        if (!sessions[sessionid]) return message.reply(`Enter a valid session number.`);
        let iUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[1]);
        if (!(sessions[sessionid].users.findIndex(user => user === iUser) === -1)) return message.reply("This user is already part of this session.");
        let invitation_embed = new Discord.RichEmbed()

        sessions[sessionid].invited.push(iUser.id);

        fs.writeFile("./sessions.json", JSON.stringify(sessions), (err) => {
            if (err) console.log(err);
        });


        return message.channel.send(`${invitor} has invited ${iUser} to session: ${sessionid}`);
    }


    function createID() {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return Math.random().toString(36).substr(2, 9);
    };

    

}

module.exports.help = {
    name: "session"
}