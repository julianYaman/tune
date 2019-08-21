/**
 * @fileOverview File with important functions for the bot
 * */

const {PREFIX} = require('./../config.js')
const radioList = require('./../radios')

/**
 * Function which connects you to the web radio and plays music
 *
 * @param {Object} radio - Radio which should be played
 * @param {Message} message - Message object of Discord.js
 * @param {VoiceChannel} voiceChannel - The voice connection of the bot to the guild
 */
exports.playRadio = (radio, message, voiceChannel) => {

  // Check if the bot is already in the channel and if the user is in the same channel.
  // If the bot and the user are in the same channel, the bot will not "rejoin" but he will
  // change the radio. If they are both not in the same channel,
  // the bot will check first if the user is in a channel and then tries to connect to it and tries to play the music-
  if(message.guild.voiceConnection && message.member.voiceChannel.id === message.guild.voiceConnection.channel.id){

    // Sending a response that the bot is now playing the music
    message.channel.send(`🎵 Now playing **${radio.name}**!`)

    // Playing the music!!!
    const dispatcher = message.guild.voiceConnection.playStream(`${radio.stream_url}`)
      .on("start", st => {console.log(st)})
      .on("debug", d => {console.log(d)})
      .on("error", e => {console.log(e)})
      .on("speaking", sp => {console.log(sp)})
      .on('end', reason => {console.log(reason)})
    console.log(dispatcher.player.currentStream)

  }else {

    // If the user is in a channel
    if (voiceChannel) {
      // Then try to join his channel
      voiceChannel.join().then(connection => {

        // logging channel data
        console.log(`Joined Channel and try to play music`)

        // Sending a response that the bot is now playing the music
        message.channel.send(`🎵 Now playing **${radio.name}**!`)

        // Playing the music!!!
        const dispatcher = message.guild.voiceConnection.playStream(`${radio.stream_url}`)
          .on("start", st => {console.log("start:"); console.log(st)})
          .on("debug", d => {console.log("debug:"); console.log(d)})
          .on("error", e => {console.log("error:"); console.log(e);})
          .on("speaking", sp => {console.log("speaking:"); console.log(sp);})
          .on('end', reason => {console.log("end:"); console.log(reason)})
        console.log(dispatcher.player.currentStream)
        // dispatcher.resume()

        // Or catch any error
      }).catch(e => {
        // Error message
        message.channel.send(`❌ I can´t play music. (${e})`)
        console.error(e)
      })

    } else {
      // User must join a channel first before the bot can do something
      message.reply('you need to join a voice channel first!').catch(e => {
        console.log(`${message.guild.name} -> Error appeared: ${e}`)
      })
    }

  }

}

/**
 * Function which returns the genres or categories in which the radios are grouped
 *
 * @returns {Array} - All genres or categories (keys of the object) in which the radios are grouped as an array.
 */
exports.getRadioCategories = () => {

  return Object.keys(radioList)

}

/**
 * Function which returns all radios of a specific category
 *
 * @param {String} category - The category of the radios
 *
 * @returns - All radios of this specific category
 */
exports.getRadios = (category) => {


}