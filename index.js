const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const colors = require('./colors.json');

client.on("ready", () => {
    // This event will run if the bot starts, and logs in, successfully.
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
    // Example of changing the bot's playing game to something useful. `client.user` is what the
    // docs refer to as the "ClientUser".
    client.user.setActivity(`v ${config.version} | ${config.prefix}help | ${client.guilds.size} servers`);
  });
  
  client.on("guildCreate", guild => {
    // This event triggers when the bot joins a guild.
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setActivity(`v ${config.version} | ${config.prefix}help | ${client.guilds.size} servers`);
  });
  
  client.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a guild.
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`v ${config.version} | ${config.prefix}help | ${client.guilds.size} servers`);
  });
client.on('message', message => {

    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === 'rps') {
        let embedsds = new Discord.RichEmbed()
        .setColor("#fc6b03")
        .setDescription("Draw!🎲")
        .setTimestamp();
        let embeds = new Discord.RichEmbed()
        .setColor("#03ff07")
        .setDescription("You won!🎉")
        .setTimestamp();
        let embedsd = new Discord.RichEmbed()
        .setColor("#fc0303")
        .setDescription("You lose!🎲")
        .setTimestamp();
        let embed = new Discord.RichEmbed()
        .setColor("#fc6b03")
        .setTitle("**Choose error!**")
        .setDescription(`Please play with one of these responses: \`rock⚫, paper⬜, scissors✂️\`\n**Example :\`${config.prefix}rps rock\`**`)
        .setTimestamp()
        let replies = ['rock', 'paper', 'scissors'];
        let result = Math.floor((Math.random() * replies.length));

        let uReply = args[0];
        if (!uReply) return message.channel.send(embed).then(msg => {msg.react("🔴", 3000);msg.delete(20000); message.delete(5000)})
        if (!replies.includes(uReply)) return message.channel.send(embed).then(msg => {msg.delete(10000);message.delete()})
        if (replies[result] === uReply) {
            message.channel.send(`Bot choosed : ${replies[result]}`)
            return message.channel.send(embedsds);
        } else if (uReply === 'rock' || uReply === 'r' || uReply === 'R' || uReply === 'Rock' ) {
           message.channel.send(`Bot choosed : ${replies[result]}`);
            if (replies[result] === 'paper') return message.channel.send(embedsd);
            else return message.channel.send(embeds);
        } else if (uReply === 'scissors'|| uReply === 'sc'||uReply === 's' || uReply === 'scis' || uReply === 'Scis' || uReply === 'S') {
            message.channel.send(`Bot choosed : ${replies[result]}`);
            if (replies[result] === 'rock') return message.channel.send(embedsd);
            else return message.channel.send(embeds);
        } else if (uReply === 'paper' || uReply === 'p' || uReply === 'Paper' || uReply === 'pap' || uReply === 'P' || uReply === 'PAPER' || uReply === 'pAPER') {
            message.channel.send(`Bot choosed : ${replies[result]}`);
            if (replies[result] === 'scissors') return message.channel.send(embedsd);
            else return message.channel.send(embeds);
        }
    }
});

client.on('message', message =>{
    if(message.content === config.prefix + 'ping'){
       let botMessage =  message.channel.send("Checking").then(m =>{
            m.edit("Checking.");m.edit("Checking..");m.edit("Checking...");
            let ping = m.createdTimestamp - message.createdTimestamp;
            let botPing = Math.round(client.ping);
            m.edit(`Bot ping: ${ping} ms `).then
            m.react('🏓')
            m.delete(30000);
            message.delete(30000);
        })
    }
    if(message.channel.type === "dm") return;
    let embedsd = new Discord.RichEmbed()
    .setColor("#03ff07")
    .setDescription("Successfully deleted")
    .setTimestamp()
    let embedsdsd = new Discord.RichEmbed()
    .setColor("#fc0303")
    .setTitle("Message number error")
    .setDescription("Please provide a number message to clear")
    .setTimestamp()
    let embed = new Discord.RichEmbed()
    .setColor("#fc0303")
    .setTitle("Permissions error")
    .setDescription("You dont have permissions \`MANAGE_MESSAGES\` to clear it")
    .setTimestamp()
    let args = message.content.substring((config.prefix).lenght).split(" ");
    switch(args[0]) {
        case `${config.prefix}clear`:
            message.delete();
         if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(embed)
         
         if(!args[1]) return message.channel.send(embedsdsd);
            message.channel.bulkDelete(args[1])
             message.channel.send(embedsd).then(msg =>{
             msg.delete(10000);
         })
    }
})
client.on('message', message => {
    let args = message.content.substring((config.prefix).lenght).split(" ");
    let embed = new Discord.RichEmbed()
    .setColor("#fc0303")
    .setTitle("Permissions error")
    .setDescription("Sorry, but you dont have permissions to \`KICK_MEMBERS\`")
    if(message.content.startsWith(config.prefix + 'kick')) {
        if(!message.guild) return;
    if(message.channel.type === "dm") return;
    if(message.author.bot) return;
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(embed);
        const user = message.mentions.users.first();
       if(user) {
         const member = message.guild.member(user);
         if (member) {
           member
           .kick(`${args[2]}`)
           .then(()=>{
            let embed = new Discord.RichEmbed()
            .setColor("#fc0303")
            .setDescription(`**Succesfully kicked ${user.tag}, reason : \`${args[2]}\`**`)
            .setTimestamp()
            message.channel.send(embed)
           })
            .catch(err => {
              let embed = new Discord.RichEmbed()
              .setTitle("Permissions error")
              .setColor("#fc0303")
              .setTimestamp()
              .setAuthor(message.author.tag, message.author.avatarURL)
              .setDescription('Dont have permissions to kick ' + user.tag)
              message.channel.send(embed);
              console.error(err);
 
            });
         } else { 
            // The mentioned user isn't in this guild
            let embed = new Discord.RichEmbed()
              .setTitle("Mention error")
              .setColor("#fc0303")
              .setTimestamp()
              .setAuthor(message.author.tag, message.author.avatarURL)
              .setDescription("**That user isn't in this guild!**")
              message.channel.send(embed);
       }
       // Otherwise, if no user was mentioned
     } else {let embed = new Discord.RichEmbed()
        .setTitle("Mention error")
        .setColor("#fc0303")
        .setTimestamp()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(`You didn't mention the user!\n \`${config.prefix}kick @user broked_the_rules\``)
        message.channel.send(embed);
     }
           }
 })
 client.on('message', message => {
    let embed = new Discord.RichEmbed()
    .setTitle("Permissions error")
    .setDescription("Sorry, but you dont have permissions to \`BAN_MEMBERS\`")
    .setColor(colors.red)
    let args = message.content.substring((config.prefix).lenght).split(" ");
    if(message.content.startsWith(config.prefix + 'ban')) {
    if(!message.guild) return;
    if(message.channel.type === "dm") return;
    if(message.author.bot) return;
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(embed);
        const user = message.mentions.users.first();
       if(user) {
         const member = message.guild.member(user);
         if(member) {
           member 
           .ban({
             reason : `${args[2]}`
           }).then(() => {
               let reason = args[2];
               if(reason) {
                let embed = new Discord.RichEmbed()
                .setColor("#fc0303")
                .setDescription(`**Succesfully banned <@${user.id}>\nReason : \`${args[2]}\` <a:ban:692685438166761562>**`)
             .setTimestamp() 
             message.channel.send(embed)} else {
                 let embed = new Discord.RichEmbed()
                .setColor("#fc0303")
                .setDescription(`**Succesfully banned <@${user.id}>** <a:ban:692685438166761562>`)
             .setTimestamp()
             message.channel.send(embed)
             }
           }) 
          .catch(err => {
            let embed = new Discord.RichEmbed()
            .setTitle("Permissions error")
            .setColor("#fc0303")
            .setTimestamp()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setDescription('Dont have permissions to ban ' + user.tag)
            message.channel.send(embed);
            console.error(err);

          })
        } else {
            let embed = new Discord.RichEmbed()
            .setTitle("Mention error")
            .setColor("#fc0303")
            .setTimestamp()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setDescription("That user isn't in this guild!")
            message.channel.send(embed); 
        }
      } else {let embedsdsds = new Discord.RichEmbed()
        .setTitle("Mention error")
        .setColor("#fc0303")
        .setTimestamp()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(`You didn't mention the user!\n \`${config.prefix}ban @user broked_the_server\``)
        message.channel.send(embedsdsds);
      }
         }
  })

client.on('message', message => {
    if(message.content.type == 'dm') return member.send("Error")
    if(message.content.startsWith(`${config.prefix}serverinfo`)){
    if(message.author.bot) return;
      if(!message.guild) {
          return }
          else {
        let embed = new Discord.RichEmbed()
        .setColor(colors.yellow)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setTitle("Server information")
        .setTimestamp()
        .addField("**Server name:**", `${message.guild.name}`, true)
        .addField("**Owner:**", `<@${message.guild.ownerID}>`, true)
        .addField("**Member count:**", `${message.guild.memberCount}`, true)
        .addField("**Role count:**", `${message.guild.roles.size}`, true)
        .addField("**Emoji count:**", message.guild.emojis.size)
        .addField("**Region:**", message.guild.region, true)
        .addField("**Verification level:**", message.guild.verificationLevel, true)
        .addField("**Created:**", moment.utc(message.guild.createdAt).format("MMMM Do YYYY, h:mm a"))
        .setThumbnail(message.guild.iconURL)
        .setFooter(`Generated For ${message.member.user.username}`, message.author.avatarURL)
        message.channel.send(embed)
      }
}
    
})  
client.on('message', async message => {
    if(message.content === `${config.prefix}help`){
        let embed = new Discord.RichEmbed()
        .setTitle("Command list")
        .setColor(colors.cyan)
        .addField("Prefix:", `${config.prefix}`)
        .addField("Finn[BOT]", `${config.version}`)
        .addField("information", "\`serverinfo\`, \`userinfo\`, \`bot\`, \`ping\`")
        .addField("Moderation", "\`clear\`, \`kick\`, \`ban\`, \`create-role\`")
        .addField("Fun", "\`vote\`, \`say\`, \`rps\`")
        .addField("Support", '[Join our support](https://discord.gg/4CN39jM)')
        .addField("Add Finn[BOT]", '[Add FInn[BOT] to your server](https://discordapp.com/api/oauth2/authorize?client_id=690241640027258887&permissions=8&scope=bot)')
        .setFooter(`Generated For ${message.member.user.username}`, message.author.avatarURL)
        .setTimestamp()
        message.channel.send(embed)
    }
})
client.on('message', message => {
    if(message.content.startsWith(`${config.prefix}bot`)) {
        if(message.author.bot) return;
        let embed = new Discord.RichEmbed()
        .setTitle("<a:Pick:692673326811971644> Information")
        .setColor("#03ffcd")
        .setTimestamp()
        .addField("**Bot version:**", `${config.version}`)
        .addField("**Prefix :**", config.prefix)
        .addField("**Owner of bot:**", "xTime#1927")
        .addField("**Help command:**", `${config.prefix}help`)
        .addField("**Bot Server :**", "[**Click here**](https://discord.gg/4CN39jM)")
        .addField("**Bot link:**", "[**Click here**](https://discordapp.com/api/oauth2/authorize?client_id=690241640027258887&permissions=8&scope=bot)")
        message.channel.send(embed)
    }
})
client.on('guildMemberAdd', member => {
    let embed = new Discord.RichEmbed()
    .setColor("#b303ff")
    .setTitle("Member joined")  
    .setDescription(`Hello&Welcome ${member.user.username} to the server ${member.guild.name} <a:eyes_new:692686292038713364>`)
    member.send(embed).then(msg => {
        msg.delete(300000)
    })
})
client.on('message', message => {
    let embed = new Discord.RichEmbed()
    .setColor("#fc0303")
    .setTitle("Permissions error")
    .setDescription("You dont have permission \`MANAGE_ROLES\` to create role")
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    let embeds = new Discord.RichEmbed()
        .setColor("#fc0303")
        .setTitle("Command format error")
        .setDescription(`You forget to provide :\nRole name\n Type: \`Administator, Moderation, Member, Muted, Kick, Ban, Default\`\nRoleColor: \`Red, White, Black, Gray, Green, Purple, Dark_Purple, Yellow, Cyan, Blue, Orange, Default\`\n Role position: \`any number\`\n\nExample: \`${config.prefix}create-role Example_role Default Default 1\``)
        let embedp = new Discord.RichEmbed()
            .setColor("#fc0303")
            .setTitle("Command format error")
            .setDescription(`RoleColor: \`Red, White, Black, Gray, Green, Purple, Default, etc...\`\n Role position: \`any number\`\nExample: \`${config.prefix}create-role Example_role Default Default 0\``)

        if(message.content.startsWith(`${config.prefix}create-role`)){
        if(message.channel.type == 'dm') return;
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(embed);
        if(!args[1]) return message.channel.send(embeds).then(msg => {msg.delete(30000), message.delete(29000)})
        if(!args[2]){
        message.channel.send(embeds).then(msg => {
        msg.delete(30000), message.delete(30000)})} else if(!args[3]) { 
        message.channel.send(embeds).then(msg => {
            msg.delete(20000)
            message.delete(20000)
        })}
        if(!args[4]) return message.channel.send(embeds).then(msg => {msg.delete(30000), message.delete(5000)})
        if(args[2] === "Moderation"){
            let embed_perm = new Discord.RichEmbed()
        .setColor(colors.red)
        .setTitle("Permisions error")
        .setDescription("You dont have permission \`ADMINISTATOR\` to create role with moderation perms!")
        if(!message.author.hasPermission('ADMINISTRATOR')) return message.channel.send(embed).then(msg => {msg.delete(30000)})
        message.member.guild.createRole({
            name : args[1]
        }).then(role => {
            role.setPermissions(0)
            role.setPermissions(['VIEW_CHANNEL', 'VIEW_AUDIT_LOG', 'USE_EXTERNAL_EMOJIS', 'STREAM', 'SPEAK', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'READ_MESSAGES', 'MUTE_MEMBERS', 'MOVE_MEMBERS', 'MANAGE_ROLES', 'MANAGE_NICKNAMES', 'MANAGE_MESSAGES', 'MANAGE_CHANNELS', 'CONNECT', 'CHANGE_NICKNAME', 'EMBED_LINKS', 'ADD_REACTIONS'])
            .then(() => {
                if(args[3] === 'Red') {
                    role.setColor("#fc0303")} else if(args[3] === 'White') {role.setColor("#ffffff")} else if (args[3] === 'Black') {role.setColor("#080000")} else if (args[3] === 'Green') {role.setColor("#03ff07")} else if (args[3] === 'Gray') {role.setColor("#bfbdbd")} else if (args[3] === 'Purple') {role.setColor("#fb03ff")}  else if (args[3] === 'Yellow') {role.setColor("#fcf403")} else if (args[3] === 'Dark_Purple') {role.setColor("#b303ff")} else if (args[3] === 'Orange') {role.setColor("#fc6b03")} else if (args[3] === 'Cyan') {role.setColor("#03ffcd")} else if (args[3] === 'Blue') {role.setColor("#0310ff")} else if(args[3] === 'Default') {}
            }).then(() =>{
                role.setPosition(`${args[4]}`)
            })
            .then(()=>{
                message.delete(1000)
                let embed = new Discord.RichEmbed()
                .setColor("#fc0303")
                .setTitle("Role")
                .setDescription(`Role : [<@&${role.id}>] successfully created with \`${role.permissions}\` permissions in \`${role.position}\` position`)
                message.channel.send(embed)
                })

        })   
    }if(args[2] === "Administator"){
        let embed_perm = new Discord.RichEmbed()
        .setColor(colors.red)
        .setTitle("Permisions error")
        .setDescription("You dont have permission \`ADMINISTATOR\` to create role with admin perms!")
        if(!message.author.hasPermission('ADMINISTRATOR')) return message.channel.send(embed).then(msg => {msg.delete(30000)})
        message.member.guild.createRole({
            name : args[1]
        }).then(role => {
            role.setPermissions(1)
            role.setPermissions(['ADMINISTRATOR'])
            .then(() => {
                if(args[3] === 'Red') {
                    role.setColor("#fc0303")} else if(args[3] === 'White') {role.setColor("#ffffff")} else if (args[3] === 'Black') {role.setColor("#080000")} else if (args[3] === 'Green') {role.setColor("#03ff07")} else if (args[3] === 'Gray') {role.setColor("#bfbdbd")} else if (args[3] === 'Purple') {role.setColor("#fb03ff")}  else if (args[3] === 'Yellow') {role.setColor("#fcf403")} else if (args[3] === 'Dark_Purple') {role.setColor("#b303ff")} else if (args[3] === 'Orange') {role.setColor("#fc6b03")} else if (args[3] === 'Cyan') {role.setColor("#03ffcd")} else if (args[3] === 'Blue') {role.setColor("#0310ff")} else if(args[3] === 'Default') {}
            })
                .then(() =>{
                role.setPosition(args[4])
                })
                .then(()=>{message.delete(1000)
                let embed = new Discord.RichEmbed()
                .setColor("#fc0303")
                .setTitle("Role")
                .setDescription(`Role : [<@&${role.id}>] successfully created with \`${role.permissions}\` permissions in \`${role.position}\` position`)
                message.channel.send(embed)
                })
        })   
    }if(args[2] === "Muted"){
        message.member.guild.createRole({
            name : args[1]
        }).then(role => {
            role.setPermissions(0)
            .then(() => {
                if(args[3] === 'Red') {
                    role.setColor("#fc0303")} else if(args[3] === 'White') {role.setColor("#ffffff")} else if (args[3] === 'Black') {role.setColor("#080000")} else if (args[3] === 'Green') {role.setColor("#03ff07")} else if (args[3] === 'Gray') {role.setColor("#bfbdbd")} else if (args[3] === 'Purple') {role.setColor("#fb03ff")}  else if (args[3] === 'Yellow') {role.setColor("#fcf403")} else if (args[3] === 'Dark_Purple') {role.setColor("#b303ff")} else if (args[3] === 'Orange') {role.setColor("#fc6b03")} else if (args[3] === 'Cyan') {role.setColor("#03ffcd")} else if (args[3] === 'Blue') {role.setColor("#0310ff")} else if(args[3] === 'Default') {}
            }).then(() =>{
                role.setPosition(args[4])
                })
            .then(()=>{
                message.delete(1000)
                let embed = new Discord.RichEmbed()
                .setColor("#fc0303")
                .setTitle("Role")
                .setDescription(`Role : [<@&${role.id}>] successfully created with \`${role.permissions}\` permissions in \`${role.position}\` position`)
                message.channel.send(embed)
                })
        })  
    }if(args[2] === "Member"){
        message.member.guild.createRole({
            name : args[1]
        }).then(role => {
            role.setPermissions(0)
            role.setPermissions(['VIEW_CHANNEL', 'USE_EXTERNAL_EMOJIS', 'STREAM', 'SPEAK', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'READ_MESSAGES', 'CONNECT', 'CHANGE_NICKNAME','ADD_REACTIONS', 'PRIORITY_SPEAKER'])
            .then(() => {
                if(args[3] === 'Red') {
                    role.setColor("#fc0303")} else if(args[3] === 'White') {role.setColor("#ffffff")} else if (args[3] === 'Black') {role.setColor("#080000")} else if (args[3] === 'Green') {role.setColor("#03ff07")} else if (args[3] === 'Gray') {role.setColor("#bfbdbd")} else if (args[3] === 'Purple') {role.setColor("#fb03ff")}  else if (args[3] === 'Yellow') {role.setColor("#fcf403")} else if (args[3] === 'Dark_Purple') {role.setColor("#b303ff")} else if (args[3] === 'Orange') {role.setColor("#fc6b03")} else if (args[3] === 'Cyan') {role.setColor("#03ffcd")} else if (args[3] === 'Blue') {role.setColor("#0310ff")} else if(args[3] === 'Default') {}
            })
            .then(() =>{
                role.setPosition(args[4])
                }).then(()=>{
                message.delete(1000)
                let embed = new Discord.RichEmbed()
                .setColor("#fc0303")
                .setTitle("Role")
                .setDescription(`Role : [<@&${role.id}>] successfully created with \`${role.permissions}\` permissions in \`${role.position}\` position`)
                message.channel.send(embed)
                })
        }) 
    }if(args[2] === "Kick"){
        let embed_perm = new Discord.RichEmbed()
        .setColor(colors.red)
        .setTitle("Permisions error")
        .setDescription("You dont have permission \`KICK_MEMBERS\` to create role with kick perms!")
        if(!message.author.hasPermission('KICK_MEMBERS')) return message.channel.send(embed).then(msg => {msg.delete(30000)})
        message.member.guild.createRole({
            name : args[1]
        }).then(role => {
            role.setPermissions(0)
            role.setPermissions(['KICK_MEMBERS'])
            .then(() => {
                if(args[3] === 'Red') {
                    role.setColor("#fc0303")} else if(args[3] === 'White') {role.setColor("#ffffff")} else if (args[3] === 'Black') {role.setColor("#080000")} else if (args[3] === 'Green') {role.setColor("#03ff07")} else if (args[3] === 'Gray') {role.setColor("#bfbdbd")} else if (args[3] === 'Purple') {role.setColor("#fb03ff")}  else if (args[3] === 'Yellow') {role.setColor("#fcf403")} else if (args[3] === 'Dark_Purple') {role.setColor("#b303ff")} else if (args[3] === 'Orange') {role.setColor("#fc6b03")} else if (args[3] === 'Cyan') {role.setColor("#03ffcd")} else if (args[3] === 'Blue') {role.setColor("#0310ff")} else if(args[3] === 'Default') {}
            }).then(() =>{
                role.setPosition(args[4])
                })
            .then(()=>{
                message.delete(1000)
                let embed = new Discord.RichEmbed()
                .setColor("#fc0303")
                .setTitle("Role")
                .setDescription(`Role : [<@&${role.id}>] successfully created with \`${role.permissions}\` permissions in \`${role.position}\` position`)
                message.channel.send(embed)
                })

        })   
    }if(args[2] === "Ban"){
        let embed_perm = new Discord.RichEmbed()
        .setColor(colors.red)
        .setTitle("Permisions error")
        .setDescription("You dont have permission \`BAN_MEMBERS\` to create role with ban perms!")
        if(!message.author.hasPermission('BAN_MEMBERS')) return message.channel.send(embed).then(msg => {msg.delete(30000)})
        message.member.guild.createRole({
            name : args[1]
        }).then(role => {
            role.setPermissions(0)
            role.setPermissions(['BAN_MEMBERS'])
            .then(() => {
                if(args[3] === 'Red') {
                    role.setColor("#fc0303")} else if(args[3] === 'White') {role.setColor("#ffffff")} else if (args[3] === 'Black') {role.setColor("#080000")} else if (args[3] === 'Green') {role.setColor("#03ff07")} else if (args[3] === 'Gray') {role.setColor("#bfbdbd")} else if (args[3] === 'Purple') {role.setColor("#fb03ff")}  else if (args[3] === 'Yellow') {role.setColor("#fcf403")} else if (args[3] === 'Dark_Purple') {role.setColor("#b303ff")} else if (args[3] === 'Orange') {role.setColor("#fc6b03")} else if (args[3] === 'Cyan') {role.setColor("#03ffcd")} else if (args[3] === 'Blue') {role.setColor("#0310ff")} else if(args[3] === 'Default') {}
            }).then(() =>{
                role.setPosition(args[4])
                })
            .then(()=>{
                message.delete(1000)
                let embed = new Discord.RichEmbed()
                .setColor("#fc0303")
                .setTitle("Role")
                .setDescription(`Role : [<@&${role.id}>] successfully created with \`${role.permissions}\` permissions in \`${role.position}\` position`)
                message.channel.send(embed)
                })
        })   
    }if(args[2] === "Default"){
        message.member.guild.createRole({
            name : args[1]
        }).then(role => {
            role.setPermissions([])
            .then(() => {
                if(args[3] === 'Red') {
                    role.setColor("#fc0303")} else if(args[3] === 'White') {role.setColor("#ffffff")} else if (args[3] === 'Black') {role.setColor("#080000")} else if (args[3] === 'Green') {role.setColor("#03ff07")} else if (args[3] === 'Gray') {role.setColor("#bfbdbd")} else if (args[3] === 'Purple') {role.setColor("#fb03ff")}  else if (args[3] === 'Yellow') {role.setColor("#fcf403")} else if (args[3] === 'Dark_Purple') {role.setColor("#b303ff")} else if (args[3] === 'Orange') {role.setColor("#fc6b03")} else if (args[3] === 'Cyan') {role.setColor("#03ffcd")} else if (args[3] === 'Blue') {role.setColor("#0310ff")} else if(args[3] === 'Default') {}
            }).then(() =>{
                role.setPosition(args[4])
                })
            .then(()=>{
                message.delete(1000)
                let embed = new Discord.RichEmbed()
                .setColor("#fc0303")
                .setTitle("Role")
                .setDescription(`Role : [<@&${role.id}>] successfully created with \`${role.permissions}\` permissions in \`${role.position}\` position`)
                message.channel.send(embed)
                })
        })   
    }
  }
})
const moment = require('moment')
client.on('message', message => {
    if( message.content.startsWith(`${config.prefix}userinfo`)) {
    let user = message.mentions.users.first()
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    let emes = new Discord.RichEmbed()
        .setColor(colors.red)
        .setTitle("Command format error")
        .setTimestamp()
        .setDescription("You didn't mention user!")
    if(!message.mentions.users.first()) return  message.channel.send(emes).then(msg => {
        msg.delete(10000)
        message.delete(1000)
    })
        if(user.bot) { 
        let embed = new Discord.RichEmbed()
        .setTitle("Bot info")
        .setColor(colors.red)
        .addField("Bot: ", `<@${user.id}>`)
    .addField("Status: ", user.presence.status)
    .addField("User ID :", user.id)
    .setImage(user.avatarURL)
    .addField("Game :", user.presence.game ? user.presence.game.name : "Game : none")
    .addField("Created at ", moment.utc(user.createdAt).format("MMMM Do YYYY, h:mm a"))
    message.channel.send(embed); return
    }
    if(user) {
        let userinfo = new Discord.RichEmbed()
    .setColor(colors.red)
    .setTitle("**User info :**")
    .addField("Username: ", `<@${user.id}>`)
    .addField("Status: ", user.presence.status)
    .addField("User ID :", user.id)
    .setImage(user.avatarURL)
    .addField("Game :", user.presence.game ? user.presence.game.name : "Game : none")
    .addField("Created at ", moment.utc(user.createdAt).format("MMMM Do YYYY, h:mm a"))
    .addField("Last message: ", user.lastMessage)
        message.channel.send(userinfo).then(() => {
            message.delete(100)
        })
    } else {
        let eme = new Discord.RichEmbed()   
        .setColor(colors.red)
        .setTitle("Command format error")
        .setTimestamp()
        .setDescription("You didn't mention user!")
    message.channel.send(eme).then(msg => {
        msg.delete(10000)
        message.delete(1000)
    })
    }
}
})
client.on('message', message => { 
    let permError = new Discord.RichEmbed()
    .setTitle("Permissions error")
    .setColor(colors.red)
    .setDescription("You dont have permissions \`MANAGE_MESSAGES\` to use command!")
    .setTimestamp()
    if(message.author.bot) return; 
     if(message.content.indexOf(config.prefix) !== 0) return;
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
      const command = args.shift().toLowerCase();
    if(command === "say") {
        if(!message.guild) return
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(permError).then(msg => {
                message.delete()
            })
        const sayMessage = args.join(" ");
        // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
        message.delete().catch(O_o=>{}); 
        // And we get the bot to say the thing: 
            let embed = new Discord.RichEmbed()
            .setColor(colors.cyan)
            .setDescription(sayMessage)
            .setFooter(`${message.member.user.username}`)
        message.channel.send(embed)
      }
    })
    client.on('message', message => { 
        if(message.author.bot) return;
         if(message.content.indexOf(config.prefix) !== 0) return;
            const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
          const command = args.shift().toLowerCase();
        if(command === "vote") {
        if(!message.guild) {
            return
        }   else {
            let embedsdd = new Discord.RichEmbed()
    .setColor(colors.red)
    .setTitle("Permissions error")
    .setDescription("You dont have permissions \`MANAGE_WEBHOOKS\` to do it!")
    .setTimestamp()
        if(!message.member.hasPermission("MANAGE_WEBHOOKS")) return message.channel.send(embedsdd).then(msg => {msg.delete(10000), message.delete(1000)})
        const sayMessage = args.join(" ");
            // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
            message.delete().catch(O_o=>{}); 
            // And we get the bot to say the thing: 
                let embed = new Discord.RichEmbed()
                .setColor(colors.cyan)
                .setTitle("Vote")
                .setDescription(sayMessage)
                .setFooter(`${message.member.user.username}`)
            message.channel.send(embed).then(async (msg) => {
                await msg.react("👍");
                await msg.react("🤷")
                await msg.react("👎");
                });
          }
        }
        })
client.login(process.env.token_bot);
