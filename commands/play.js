// Any module required will be written up here
const radioManager = require('./../modules/radio-manager')
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
	execute(message, args, config, client) {

		// FOR BOT OWNERS WITH OWN LISTS, SET CATEGORYLIST TO FALSE
		// IF YOU HAVE AN UNCATEGORIZED LIST OF RADIOS NOT LIKE THE
		// CURRENT LIST.
		const categorylist = true

		// All Genres or Categories in which the radios are grouped in
		const genres = radioManager.getRadioCategories()

		// Embed with short explanation how to use this command
		const howToUseEmbed = {
			color: 0xf1892d,
			title: `How to use the ${this.name} command - ${message.client.user.username}`,
			fields: [
				{
					name: 'Currently, the bot can play radio of the following genres / categories:',
					value: _.join(genres, ', '),
				},
				{
					name: 'How to use the command:',
					value: 'You can play a radio by using the command like this: \n`' + config.PREFIX + this.name + ' [category] [radio selection (number)]`',
				},
			],
			footer: 'More help: [Tune - Commands](https://www.julianyaman.de/tune)',
		}

		// Embed with the message that the user needs to be in a channel first before using the command
		const voiceChannelErrorEmbed = {
			color: 0xff0000,
			description: 'You must join a voice channel before you can use this command!',
		}

		// If the user is not connected to a voice channel, then send this embed that he should join one#
		// in first place to use the command.
		if(!message.member.voiceChannel) return message.channel.send({ embed: voiceChannelErrorEmbed })

		// Check if there are any arguments added to the command
		if (!args[0]) {
			return message.channel.send({ embed: howToUseEmbed })
		}

		if (!categorylist) {
			// If radios are not categorized (so radios are just simply ordered by no category, just listed in the object)
			// then the process continues here.
			// radioManager.playRadio(args[0])
		}
		else{
			const genre = args[0].toLowerCase()
			let selectedRadio = args[1]

			// If the user did not select a radio, just play the first one
			// TODO: Decide if the first one or a random one should be played...
			if (selectedRadio === undefined || selectedRadio === null) return message.channel.send({ embed: radioManager.getRadiosEmbed(genre, this.name, config.PREFIX, message) }, client)

			// If the radio selection is not an integer, then make it to an integer
			if (_.isInteger(selectedRadio) === false) selectedRadio = _.toInteger(selectedRadio)

			// Since counting starts with 0 in programming and the list with 1, we need to subtract the integer by 1 unless its 0.
			selectedRadio = (selectedRadio === 0) ? 0 : selectedRadio - 1

			// Play the radio
			radioManager.playRadio(radiolist[genre][selectedRadio], message, message.member.voiceChannel, client)

		}


	},
}
