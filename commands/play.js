// Any module required will be written up here
const radioManager = require("./../modules/radio-manager")
const radiolist = require('./../radios')
const _ = require('lodash')

/**
 * Command: play / radio
 * Description: Command to play a radio.
 * */
module.exports = {
  name: 'play',
  alias: 'radio',
  description: 'Playing a web radio',
  execute (message, args, config) {

    // FOR BOT OWNERS WITH OWN LISTS, SET CATEGORYLIST TO FALSE
    // IF YOU HAVE AN UNCATEGORIZED LIST OF RADIOS NOT LIKE THE
    // CURRENT LIST.
    let categorylist = true

    console.log(args)

    // Check if there are any arguments added to the command
    if (!args[0]) return message.reply("please add more arguments to the command. Example: `" + config.PREFIX + this.name + " electro 1`")

    if (!categorylist){
      // radioManager.playRadio(args[0])
    }else{
      let genre = _.lowerCase(args[0])
      let selectedRadio = args[1]

      // If the user did not select a radio, just play the first one
      // TODO: Decide if the first one or a random one should be played...
      if (selectedRadio === undefined) return radioManager.playRadio(radiolist[genre][0], message, message.member.voiceChannel)

      if (_.isInteger(selectedRadio) === false) selectedRadio = _.toInteger(selectedRadio)

      selectedRadio = (selectedRadio = 0) ? selectedRadio - 1 : 0

      radioManager.playRadio(radiolist[genre][selectedRadio], message, message.voiceConnection)

    }


  }
}
