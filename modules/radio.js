/**
 * @fileOverview File with important functions for the bot
 * */

var {PREFIX, EXPERIMENTAL} = require('./../config.json')

/**
 * Function which connects you to the web radio and plays music
 *
 * @param {GuildChannel} voiceChannel - Voice Channel
 * @param {Message} msg - Message
 * @param {String} radioType - Which radio is playing now?
 * @param {String} streamLink - Stream link to the radio
 */
exports.playRadio = (voiceChannel, msg, radioType, streamLink) => {

  // Check if the bot is already in the channel and if the user is in the same channel.
  // If the bot and the user are in the same channel, the bot will not "rejoin" but he will
  // change the radio. If they are both not in the same channel,
  // the bot will check first if the user is in a channel and then tries to connect to it and tries to play the music
  // from iLoveRadio.
  if(msg.guild.voiceConnection && msg.member.voiceChannel.id === msg.guild.voiceConnection.channel.id){

    // User limit property from the voice channel
    let userLimit
    if (voiceChannel.userLimit === 0) {
      userLimit = "unlimited"
    } else {
      userLimit = voiceChannel.userLimit
    }

    // logging channel data
    console.log(`\nSwitching the radio on a server. Here is some data:\n 
          Radio type: ${radioType}\n
          Channel name: ${voiceChannel.name}\n 
          userLimit: ${userLimit}\n 
          guild: ${voiceChannel.guild.name}\n 
          guildId: ${voiceChannel.guild.id}\n
          membercount (guild): ${voiceChannel.guild.memberCount}\n
          current amount of people in the same channel: ${voiceChannel.members.size - 1}`)

    // Sending a response that the bot is now playing the music
    msg.channel.send(`🎵 Now playing **${radioType}**! If I´m not playing music, just type the command \`\`${PREFIX}radio\`\` again. :wink:`)

    // This message will be send if the bot is currently under an experimental mode or under maintenance
    if (EXPERIMENTAL === "1") {
      msg.channel.send("**This bot is currently on the EXPERIMENTAL MODE which means that it could happen the bot stops playing music.** \n" +
        "You can see if the bot is in this mode when it is in the idle (orange dot at the profile pic) mode. \n" +
        "When the bot is on 'online' (this green dot at the profile pic), it means the bot can be used without any upcoming issues.")
    }

    // Playing the music!!!
    const dispatcher = msg.guild.voiceConnection.playStream(`${streamLink}`)

  }else {

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
          Radio type: ${radioType}\n
          Channel name: ${voiceChannel.name}\n 
          userLimit: ${userLimit}\n 
          guild: ${voiceChannel.guild.name}\n 
          guildId: ${voiceChannel.guild.id}\n
          membercount (guild): ${voiceChannel.guild.memberCount}\n
          current amount of people in the same channel: ${voiceChannel.members.size - 1}`)

        // Sending a response that the bot is now playing the music
        msg.channel.send(`🎵 Now playing **${radioType}**! If I´m not playing music, just type the command \`\`${PREFIX}radio\`\` again. :wink:`)

        // This message will be send if the bot is currently under an experimental mode or under maintenance
        if (EXPERIMENTAL === "1") {
          msg.channel.send("**This bot is currently on the EXPERIMENTAL MODE which means that it could happen the bot stops playing music.** \n" +
            "You can see if the bot is in this mode when it is in the idle (orange dot at the profile pic) mode. \n" +
            "When the bot is on 'online' (this green dot at the profile pic), it means the bot can be used without any upcoming issues.")
        }

        // Playing the music!!!
        const dispatcher = msg.guild.voiceConnection.playStream(`${streamLink}`)

        // Or catch any error
      }).catch(e => {
        // Error message
        msg.channel.send(`❌ I can´t join to your channel. (${e})`)
        console.log(e)
      })

    } else {
      // User must join a channel first before the bot can do something
      msg.reply('you need to join a voice channel first!')
    }

  }

}