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
if(process.env.TOKEN && process.env.PREFIX && process.env.VERSION) {
  var {TOKEN, PREFIX, VERSION} = process.env
}else{
  var {TOKEN, PREFIX, VERSION} = require('./config.json')
}

client.on('warn', console.warn)

client.on('error', console.error)

client.on('ready', () => {
  console.log('Starting Bot...\nNode version: ' + process.version + '\nDiscord.js version: ' + Discord.version + '\n')
  console.log("This Bot is online! Running on version " + VERSION)
  client.user.setPresence({
    status: "online",
    game: {
      name: `on ${client.guilds.size} servers! ${PREFIX}help`
    }
    }).catch(e => {
      console.error(e)
    })
  console.log(`Ready to serve on ${client.guilds.size} servers for a total of ${client.users.size} users.`)
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
  if (msg.author.bot) return undefined
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
          Radio type: main
          Channel name: ${voiceChannel.name}\n 
          userLimit: ${userLimit}\n 
          guild: ${voiceChannel.guild.name}\n 
          guildId: ${voiceChannel.guild.id}\n
          membercount (guild): ${voiceChannel.guild.memberCount}\n
          current amount of people in the same channel: ${voiceChannel.members.size - 1}`)

          // Sending a response that the bot is now playing the music
          msg.channel.send("🎵 Now playing **I LOVE RADIO**! If I´m not playing music, just type the command ``" + PREFIX + "radio`` again. :wink:")

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
          Radio type: THE BATTLE
          Channel name: ${voiceChannel.name}\n 
          userLimit: ${userLimit}\n 
          guild: ${voiceChannel.guild.name}\n 
          guildId: ${voiceChannel.guild.id}\n
          membercount (guild): ${voiceChannel.guild.memberCount}\n
          current amount of people in the same channel: ${voiceChannel.members.size - 1}`)

          // Sending a response that the bot is now playing the music
          msg.channel.send("🎵 Now playing **I LOVE THE BATTLE**! If I´m not playing music, just type the command ``" + PREFIX + "radio`` again. :wink:")

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
          Radio type: #DREIST
          Channel name: ${voiceChannel.name}\n 
          userLimit: ${userLimit}\n 
          guild: ${voiceChannel.guild.name}\n 
          guildId: ${voiceChannel.guild.id}\n
          membercount (guild): ${voiceChannel.guild.memberCount}\n
          current amount of people in the same channel: ${voiceChannel.members.size - 1}`)

          // Sending a response that the bot is now playing the music
          msg.channel.send("🎵 Now playing **I LOVE #DREIST**! If I´m not playing music, just type the command ``" + PREFIX + "radio`` again. :wink:")

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
          }
        ],
        timestamp: new Date()
      }
    })
  }

  if(command === "invite"){
    msg.delete().catch(e => {
      // console.error(e)
      msg.channel.send("❌ Message to the owner of the server: **Please give the right permissions to me so I can delete this message.**")
    })
    msg.author.send("Add the bot with the following link to your server: https://discordapp.com/oauth2/authorize?client_id=398195643371356170&scope=bot&permissions=36711488")
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