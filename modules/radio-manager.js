/**
 * @fileOverview File with important functions for the bot
 * */

const { NODES } = require('./../config.js')
const radioList = require('./../radios')
const { URLSearchParams } = require('url');
const fetch = require('node-fetch')

/**
 * Function which connects you to the web radio and plays music
 *
 * @param {Object} radio - Radio which should be played
 * @param {Message} message - Message object of Discord.js
 * @param {VoiceChannel} voiceChannel - The voice connection of the bot to the guild
 * @param {MusicClient} client - Discord.js Client
 */
exports.playRadio = async (radio, message, voiceChannel, client) => {

	// Check if the bot is already in the channel and if the user is in the same channel.
	// If the bot and the user are in the same channel, the bot will not "rejoin" but he will
	// change the radio. If they are both not in the same channel,
	// the bot will check first if the user is in a channel and then tries to connect to it and tries to play the music-
	// Joining the channel of the user
	const player = await client.player.join({
		guild: message.guild.id,
		channel: message.member.voiceChannelID,
		host: client.player.nodes.first().host,
	}, { selfdeaf: true });
	
	// If something went wrong, then return here
	// if (!player) return message.reply('Could not join');
	
	// Good ol' debugging
	// console.log(player)
	
	// The song object returned by Lavalink
	const [song] = await getSong(`${radio.stream_url}`, client)
	// console.log(song)
	
	// Playing the track returned by Lavalink
	player.updateVoiceState(message.member.voiceChannelID, { selfdeaf: false })
	player.play(song.track);
	
	// Error not good
	player.once('error', console.error);
	// End? uhhh should not happen... lmao
	player.once('end', async data => {
		if (data.reason === 'REPLACED') return
		message.channel.send('The web radio was stopped.')
		await client.player.leave(message.guild.id)
	})
	
	return message.channel.send(`Now playing: **${radio.name}**`)
	

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
 * @param {String} command - The command name
 * @param {String} prefix - The prefix of the command
 * @param {Message} message - Message object of Discord.js
 *
 * @returns {Object} - All radios of this specific category
 */
exports.getRadiosEmbed = (category, command, prefix, message) => {

	// The object of the category
	const radioObject = radioList[category]

	// If this category does not exist:
	if (radioObject === undefined) {
		return {
			color: 0xff0000,
			description: 'This category is not included in the bots\' radio list!',
		}
	}

	// If no radios are in this category
	if (radioObject === null) {
		return {
			color: 0xff0000,
			description: 'No radios found in this category!',
		}
	}

	// Each radio in an array
	const radios = []

	// Pushing every single radio into the radios array
	for(const key in radioObject) {
		if (radioObject.hasOwnProperty(key)) {
			if(key !== 'description') {
				radios.push(radioObject[key])
			}
		}
	}

	// Array used as the value of the fields key of the embed object
	const embedFields = []

	// Manipulating the radio object and pushing it into the embedFields array
	for (let i = 0; i < radios.length; i++) {

		radios[i].value = 'Play the radio: `' + prefix + command + ' ' + category + ' ' + (i + 1) + '`'
		delete radios[i].stream_url
		embedFields.push(radios[i])

	}

	// Setting up the final embed which will be sent into the channel
	const embed = {
		color: 0xf1892d,
		title: `${category} radios - ${message.client.user.username}`,
		description: 'Description: ' + radioObject.description,
		fields: embedFields,
	}

	// Returning the embed object
	return embed

}

/**
 * Getting the song array from Lavalink
 *
 * @param {String} url - Stream url of the web radio
 * @param {MusicClient} client - The MusicClient client of the bot
 *
 * @return Song array
 *
 * */
function getSong(url, client) {
	const node = client.player.nodes.first();
	
	const params = new URLSearchParams();
	params.append('identifier', url);
	
	return fetch(`http://${node.host}:${node.port}/loadtracks?${params.toString()}`, { headers: { Authorization: node.password } })
		.then(res => res.json())
		.then(data => data.tracks)
		.catch(err => {
			console.error(err);
			return null;
		});
}