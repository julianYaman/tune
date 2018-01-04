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
const client = new Discord.Client()

// Create a config file like the example-config.json
const { TOKEN, PREFIX} = require("./config.json")

client.on('warn', console.warn)

client.on('error', console.error)

client.on('ready', () => {
    console.log("This Bot is online!")
    console.log('Starting Bot...\nNode version: ' + process.version + '\nDiscord.js version: ' + Discord.version)
  }
)

client.on('disconnect', () => console.log("I disconnected but I will reconnect!"))

client.on('reconnecting', () => console.log("Reconnecting..."))

// This event triggers only when the bot joins a guild.
client.on('guildCreate', guild => {
  console.log(`Joined a new guild -> ${guild.name}. (id: ${guild.id}) This guild has ${guild.memberCount} members!`)
})

// This event triggers only when the bot is removed from a guild.
client.on('guildDelete', guild => {
  console.log(`I have been removed from -> ${guild.name}. (id: ${guild.id})`)
})

client.on('message', async msg => {
  if (msg.author.bot) return undefined
  if (!msg.content.startsWith(PREFIX)) return undefined

  const args = msg.content.split(" ")

  let command = msg.content.toLowerCase().split(" ")[0]
  command = command.slice(PREFIX.length)

  if(command === "radio"){
    const voiceChannel = msg.member.voiceChannel
    if(voiceChannel) {
      voiceChannel.join().then(connection => {
        let userLimit
        if(voiceChannel.userLimit === 0){
          userLimit = "unlimited"
        }else{
          userLimit = voiceChannel.userLimit
        }
        console.log(`\nJoined a channel and now playing iLoveRadio! Here is some data:\n 
        Channel name: ${voiceChannel.name}\n 
        userLimit: ${userLimit}\n 
        guild: ${voiceChannel.guild.name}\n 
        guildId: ${voiceChannel.guild.id}\n
        membercount: ${voiceChannel.guild.memberCount}\n`)
        msg.channel.send("Now playing **iLoveRadio**! If I´m not playing music, just type the command ``" + PREFIX + "radio`` again. :wink:")

        // Playing the music!!!
        const dispatcher = msg.guild.voiceConnection.playStream("http://stream01.iloveradio.de/iloveradio1.mp3")

      }).catch(console.error)
    }else{
      msg.reply('you need to join a voice channel first!')
    }
  }

  if(command === "help"){
    msg.delete().catch(console.error)
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