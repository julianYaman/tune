// Load up the discord.js library. Else throw an error.
try {
  var Discord = require('discord.js')
  if (process.version.slice(1).split('.')[0] < 8) {
    throw new Error('Node 8.0.0 or higher is required. Please upgrade / update Node.js on your computer / server.')
  }
} catch (e) {
  console.error(e.stack)
  console.error('Current Node.js version: ' + process.version)
  console.error("In case you´ve not installed any required module: \nPlease run 'npm install' and ensure it passes with no errors!")
  process.exit()
}
const client = new Discord.Client({disableEveryone: true})

// Create a config file like the example-config.json
// Put EXPERIMENTAL to 1 if you are developing!
var {TOKEN, PREFIX, VERSION, EXPERIMENTAL} = require('./config.json')

let clientStatus

if(EXPERIMENTAL === "1") {
  clientStatus = "idle"
}else{
  clientStatus = "online"
}

client.on('warn', console.warn)

client.on('error', console.error)

client.on('ready', async () => {
  console.log('Starting Bot...\nNode version: ' + process.version + '\nDiscord.js version: ' + Discord.version + '\n')
  console.log("This Bot is online! Running on version " + VERSION)
  client.user.setPresence({
    status: clientStatus,
    game: {
      name: `on ${client.guilds.size} servers! ${PREFIX}help`
    }
    }).catch(e => {
      console.error(e)
    })
  console.log(`Ready to serve on ${client.guilds.size} servers for a total of ${client.users.size} users.`)

  // This is only for development purposes, you can write everything you want here
  if(EXPERIMENTAL === "1"){
    // console.log("\nOnline on these servers:")
    // client.guilds.map(g => {
    //   console.log(g.name);
    // })
  }
})

client.on('disconnect', () => console.log("I disconnected currently but I will try to reconnect!"))

client.on('reconnecting', () => console.log("Reconnecting..."))

// This event triggers only when the bot joins a guild.
client.on('guildCreate', guild => {
  console.log(`Joined a new guild -> ${guild.name}. (id: ${guild.id}) This guild has ${guild.memberCount} members!`)
  client.user.setPresence({
    game: {
      name: `on ${client.guilds.size} servers! ${PREFIX}help`
    }
  }).catch(e => {
    console.error(e)
  })
})

// This event triggers only when the bot is removed from a guild.
client.on('guildDelete', guild => {
  console.log(`I have been removed from -> ${guild.name}. (id: ${guild.id})`)
  client.user.setPresence({
    game: {
      name: `on ${client.guilds.size} servers! ${PREFIX}help`
    }
  }).catch(e => {
    console.error(e)
  })
})

client.on('message', async msg => {
  if(msg.isMentioned(client.user)){
    msg.delete().catch(e => {
      // console.error(e)
      msg.channel.send("❌ Message to the owner of the server: **Please give the right permissions to me so I can delete this message.**")
    })
    msg.author.send({
      embed : {
        color: 3447003,
        title: 'I Love Radio -> Commands',
        fields: [
          {
            name: PREFIX + 'radio',
            value: 'If you are in a channel, I will join to your channel and start playing the web radio'
          },
          {
            name: PREFIX + 'stop or ' + PREFIX + 'leave',
            value: 'Stops playing the music (if you are in a voice channel) and I will leave the channel'
          },
          {
            name: PREFIX + 'invite',
            value: 'The bot will send an invite link to you so you can invite the bot to your server'
          },
          {
            name: PREFIX + 'botinfo',
            value: 'Sends information about the bot'
          },
          {
            name: PREFIX + 'list or ' + PREFIX + 'radiolist',
            value: 'Sends a list with all radios available'
          }
        ],
        timestamp: new Date()
      }
    })
  }

  if (msg.author.bot) return
  if (!msg.content.startsWith(PREFIX)) return undefined

  const args = msg.content.split(" ")

  let command = msg.content.toLowerCase().split(" ")[0]
  command = command.slice(PREFIX.length)

  if(command === "radio"){

    console.log(args)

    // If no other argument was given, then the bot will play the main radio
    if(args[1] === undefined) {

      // Voice channel
      const voiceChannel = msg.member.voiceChannel

      // If the user is in a channel
      if (voiceChannel) {
        // Then try to join his channel
        voiceChannel.join().then(connection => {

          // User limit property from the voice channel
          let userLimit
          if (voiceChannel.userLimit === 0) {
            userLimit = "unlimited"
          } else {
            userLimit = voiceChannel.userLimit
          }

          // logging channel data
          console.log(`\nJoined a channel and now playing iLoveRadio! Here is some data:\n 
          Radio type: main\n
          Channel name: ${voiceChannel.name}\n 
          userLimit: ${userLimit}\n 
          guild: ${voiceChannel.guild.name}\n 
          guildId: ${voiceChannel.guild.id}\n
          membercount (guild): ${voiceChannel.guild.memberCount}\n
          current amount of people in the same channel: ${voiceChannel.members.size - 1}`)

          // Sending a response that the bot is now playing the music
          msg.channel.send("🎵 Now playing **I LOVE RADIO**! If I´m not playing music, just type the command ``" + PREFIX + "radio`` again. :wink:")

          // This message will be send if the bot is currently under an experimental mode or under maintenance
          if(EXPERIMENTAL === "1"){
            msg.channel.send("**This bot is currently on the EXPERIMENTAL MODE which means that it could happen the bot stops playing music.** \n" +
              "You can see if the bot is in this mode when it is in the idle (orange dot at the profile pic) mode. \n" +
              "When the bot is on 'online' (this green dot at the profile pic), it means the bot can be used without any upcoming issues.")
          }

          // Playing the music!!!
          const dispatcher = msg.guild.voiceConnection.playStream("http://stream01.iloveradio.de/iloveradio1.mp3")

          // Or catch any error
        }).catch(e => {
          // Error message
          msg.channel.send("❌ I can´t join to your channel because I don´t have the permissions to do that.")
          // console.log(e)
        })

      } else {
        // User must join a channel first before the bot can do something
        msg.reply('you need to join a voice channel first!')
      }
    }

    // I LOVE THE BATTLE - Web radio
    if(args[1] === "1"){
      // Voice channel
      const voiceChannel = msg.member.voiceChannel

      // If the user is in a channel
      if (voiceChannel) {
        // Then try to join his channel
        voiceChannel.join().then(connection => {

          // User limit property from the voice channel
          let userLimit
          if (voiceChannel.userLimit === 0) {
            userLimit = "unlimited"
          } else {
            userLimit = voiceChannel.userLimit
          }

          // logging channel data
          console.log(`\nJoined a channel and now playing iLoveRadio! Here is some data:\n 
          Radio type: THE BATTLE\n
          Channel name: ${voiceChannel.name}\n 
          userLimit: ${userLimit}\n 
          guild: ${voiceChannel.guild.name}\n 
          guildId: ${voiceChannel.guild.id}\n
          membercount (guild): ${voiceChannel.guild.memberCount}\n
          current amount of people in the same channel: ${voiceChannel.members.size - 1}`)

          // Sending a response that the bot is now playing the music
          msg.channel.send("🎵 Now playing **I LOVE THE BATTLE**! If I´m not playing music, just type the command ``" + PREFIX + "radio`` again. :wink:")

          // This message will be send if the bot is currently under an experimental mode or under maintenance
          if(EXPERIMENTAL === "1"){
            msg.channel.send("**This bot is currently on the EXPERIMENTAL MODE which means that it could happen the bot stops playing music.** \n" +
              "You can see if the bot is in this mode when it is in the idle (orange dot at the profile pic) mode. \n" +
              "When the bot is on 'online' (this green dot at the profile pic), it means the bot can be used without any upcoming issues.")
          }

          // Playing the music!!!
          const dispatcher = msg.guild.voiceConnection.playStream("http://stream01.iloveradio.de/iloveradio3.mp3")

          // Or catch any error
        }).catch(e => {
          // Error message
          msg.channel.send("❌ I can´t join to your channel because I don´t have the permissions to do that.")
          // console.log(e)
        })

      } else {
        // User must join a channel first before the bot can do something
        msg.reply('you need to join a voice channel first!')
      }

    }

    // I LOVE #DREIST - Web radio
    if(args[1] === "2"){
      // Voice channel
      const voiceChannel = msg.member.voiceChannel

      // If the user is in a channel
      if (voiceChannel) {
        // Then try to join his channel
        voiceChannel.join().then(connection => {

          // User limit property from the voice channel
          let userLimit
          if (voiceChannel.userLimit === 0) {
            userLimit = "unlimited"
          } else {
            userLimit = voiceChannel.userLimit
          }

          // logging channel data
          console.log(`\nJoined a channel and now playing iLoveRadio! Here is some data:\n 
          Radio type: #DREIST\n
          Channel name: ${voiceChannel.name}\n 
          userLimit: ${userLimit}\n 
          guild: ${voiceChannel.guild.name}\n 
          guildId: ${voiceChannel.guild.id}\n
          membercount (guild): ${voiceChannel.guild.memberCount}\n
          current amount of people in the same channel: ${voiceChannel.members.size - 1}`)

          // Sending a response that the bot is now playing the music
          msg.channel.send("🎵 Now playing **I LOVE #DREIST**! If I´m not playing music, just type the command ``" + PREFIX + "radio`` again. :wink:")

          // This message will be send if the bot is currently under an experimental mode or under maintenance
          if(EXPERIMENTAL === "1"){
            msg.channel.send("**This bot is currently on the EXPERIMENTAL MODE which means that it could happen the bot stops playing music.** \n" +
              "You can see if the bot is in this mode when it is in the idle (orange dot at the profile pic) mode. \n" +
              "When the bot is on 'online' (this green dot at the profile pic), it means the bot can be used without any upcoming issues.")
          }

          // Playing the music!!!
          const dispatcher = msg.guild.voiceConnection.playStream("http://stream01.iloveradio.de/iloveradio6.mp3")

          // Or catch any error
        }).catch(e => {
          // Error message
          msg.channel.send("❌ I can´t join to your channel because I don´t have the permissions to do that.")
          // console.log(e)
        })

      } else {
        // User must join a channel first before the bot can do something
        msg.reply('you need to join a voice channel first!')
      }

    }

    // I LOVE #DREIST - Web radio
    if(args[1] === "3"){
      // Voice channel
      const voiceChannel = msg.member.voiceChannel

      // If the user is in a channel
      if (voiceChannel) {
        // Then try to join his channel
        voiceChannel.join().then(connection => {

          // User limit property from the voice channel
          let userLimit
          if (voiceChannel.userLimit === 0) {
            userLimit = "unlimited"
          } else {
            userLimit = voiceChannel.userLimit
          }

          // logging channel data
          console.log(`\nJoined a channel and now playing iLoveRadio! Here is some data:\n 
          Radio type: TOP 100 Charts\n
          Channel name: ${voiceChannel.name}\n 
          userLimit: ${userLimit}\n 
          guild: ${voiceChannel.guild.name}\n 
          guildId: ${voiceChannel.guild.id}\n
          membercount (guild): ${voiceChannel.guild.memberCount}\n
          current amount of people in the same channel: ${voiceChannel.members.size - 1}`)

          // Sending a response that the bot is now playing the music
          msg.channel.send("🎵 Now playing **I LOVE TOP 100 CHARTS**! If I´m not playing music, just type the command ``" + PREFIX + "radio`` again. :wink:")

          // This message will be send if the bot is currently under an experimental mode or under maintenance
          if(EXPERIMENTAL === "1"){
            msg.channel.send("**This bot is currently on the EXPERIMENTAL MODE which means that it could happen the bot stops playing music.** \n" +
              "You can see if the bot is in this mode when it is in the idle (orange dot at the profile pic) mode. \n" +
              "When the bot is on 'online' (this green dot at the profile pic), it means the bot can be used without any upcoming issues.\n\n" +
              "Check the mode with **" + PREFIX + "botinfo**")
          }

          // Playing the music!!!
          const dispatcher = msg.guild.voiceConnection.playStream("http://stream01.iloveradio.de/iloveradio9.mp3")

          // Or catch any error
        }).catch(e => {
          // Error message
          msg.channel.send("❌ I can´t join to your channel because I don´t have the permissions to do that.")
          // console.log(e)
        })

      } else {
        // User must join a channel first before the bot can do something
        msg.reply('you need to join a voice channel first!')
      }

    }

    if(args[1] === "4"){
      // Voice channel
      const voiceChannel = msg.member.voiceChannel

      // If the user is in a channel
      if (voiceChannel) {
        // Then try to join his channel
        voiceChannel.join().then(connection => {

          // User limit property from the voice channel
          let userLimit
          if (voiceChannel.userLimit === 0) {
            userLimit = "unlimited"
          } else {
            userLimit = voiceChannel.userLimit
          }

          // logging channel data
          console.log(`\nJoined a channel and now playing iLoveRadio! Here is some data:\n 
          Radio type: BASS\n
          Channel name: ${voiceChannel.name}\n 
          userLimit: ${userLimit}\n 
          guild: ${voiceChannel.guild.name}\n 
          guildId: ${voiceChannel.guild.id}\n
          membercount (guild): ${voiceChannel.guild.memberCount}\n
          current amount of people in the same channel: ${voiceChannel.members.size - 1}`)

          // Sending a response that the bot is now playing the music
          msg.channel.send("🎵 Now playing **I LOVE BASS**! If I´m not playing music, just type the command ``" + PREFIX + "radio`` again. :wink:")

          // This message will be send if the bot is currently under an experimental mode or under maintenance
          if(EXPERIMENTAL === "1"){
            msg.channel.send("**This bot is currently on the EXPERIMENTAL MODE which means that it could happen the bot stops playing music.** \n" +
              "You can see if the bot is in this mode when it is in the idle (orange dot at the profile pic) mode. \n" +
              "When the bot is on 'online' (this green dot at the profile pic), it means the bot can be used without any upcoming issues.\n\n" +
              "Check the mode with **" + PREFIX + "botinfo**")
          }

          // Playing the music!!!
          const dispatcher = msg.guild.voiceConnection.playStream("http://stream01.iloveradio.de/iloveradio4.mp3")

          // Or catch any error
        }).catch(e => {
          // Error message
          msg.channel.send("❌ I can´t join to your channel because I don´t have the permissions to do that.")
          // console.log(e)
        })

      } else {
        // User must join a channel first before the bot can do something
        msg.reply('you need to join a voice channel first!')
      }

    }

  }

  if(command === "help"){
    msg.delete().catch(e => {
      // console.error(e)
      msg.channel.send("❌ Message to the owner of the server: **Please give the right permissions to me so I can delete this message.**")
    })
    msg.author.send({
      embed : {
        color: 3447003,
        title: 'I Love Radio -> Commands',
        fields: [
          {
            name: PREFIX + 'radio',
            value: 'If you are in a channel, I will join to your channel and start playing the web radio'
          },
          {
            name: PREFIX + 'stop or ' + PREFIX + 'leave',
            value: 'Stops playing the music (if you are in a voice channel) and I will leave the channel'
          },
          {
            name: PREFIX + 'invite',
            value: 'The bot will send an invite link to you so you can invite the bot to your server'
          },
          {
            name: PREFIX + 'botinfo',
            value: 'Sends information about the bot'
          },
          {
            name: PREFIX + 'list or ' + PREFIX + 'radiolist',
            value: 'Sends a list with all radios available'
          }
        ],
        timestamp: new Date()
      }
    })
  }

  if(command === "botinfo"){

    let mode

    if(EXPERIMENTAL === "1"){
      mode = "**EXPERIMENTAL (issues can appear)**"
    }else{
      mode = "normal"
    }

    msg.channel.send({ embed : {
      title: "Bot information",
      fields: [
        {
          name: "Servers",
          value: `${client.guilds.size}`
        },
        {
          name: "Serving for",
          value: `${client.users.size} users in total`
        },
        {
          name: "Mode",
          value: mode
        }
      ],
      description: "Information about the bot",
      color: "3447003"
    }})
  }

  if(command === "invite"){
    msg.delete().catch(e => {
      // console.error(e)
      msg.channel.send("❌ Message to the owner of the server: **Please give the right permissions to me so I can delete this message.**")
    })
    msg.author.send("Add the bot with the following link to your server: https://discordapp.com/oauth2/authorize?client_id=398195643371356170&scope=bot&permissions=36711488")
  }

  if(command === "list" || command === "radiolist"){
    msg.channel.send({
      embed : {
        color: 3447003,
        title: 'I Love Radio -> Radio list ',
        fields: [
          {
            name: PREFIX + 'radio',
            value: 'Radio: **I LOVE RADIO**'
          },
          {
            name: PREFIX + 'radio 1',
            value: 'Radio: **I LOVE RADIO THE BATTLE**'
          },
          {
            name: PREFIX + 'radio 2',
            value: 'Radio: **I LOVE RADIO #DREIST**'
          },
          {
            name: PREFIX + 'radio 3',
            value: 'Radio: **I LOVE RADIO TOP 100 CHARTS**'
          },
          {
            name: PREFIX + 'radio 4',
            value: 'Radio: **I LOVE RADIO BASS**'
          }
        ],
        timestamp: new Date()
      }
    })
  }

  if(command === "leave" || command === "stop" ){
    const voiceChannel = msg.member.voiceChannel
    if(voiceChannel) {
      console.log("Leaving a channel and stopped playing iLoveRadio")
      msg.channel.send("I´m leaving the channel now!")
      voiceChannel.leave()
    }else{
      msg.reply('no')
    }
  }
})


client.login(TOKEN).catch(e => console.log(e))

process.on("unhandledRejection", (PromiseRejection) => console.error(`Promise Error -> ${PromiseRejection}`))