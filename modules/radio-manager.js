/**
 * @fileOverview File with important functions for the bot
 * */

const radioList = require('./../radios')
const logger = require('./logger')
const { URLSearchParams } = require('url');
const fetch = require('node-fetch')
const databaseManager = require('./../modules/database-manager')

/**
 * Function which connects you to the web radio and plays music
 *
 * @param {Object} radio - Radio which should be played
 * @param {Message} message - Message object of Discord.js
 * @param {VoiceChannel} voiceChannel - The voice connection of the bot to the guild
 * @param {MusicClient} client - Discord.js Client
 */

const db = databaseManager.init()

exports.playRadio = async (radio, message, voiceChannel, client) => {
	
	// Joining the channel of the user
	const player = await client.player.join({
		guild: message.guild.id,
		channel: message.member.voiceChannelID,
		host: client.player.nodes.first().host,
	}, { selfdeaf: true });
	
	// If something went wrong, then return here
	if (!player) return message.reply('Could not join');
	
	// Good ol' debugging
	// console.log(player)
	
	// The song object returned by Lavalink
	const [song] = await getSong(`${radio.stream_url}`, client)
	// console.log(song)
	
	// Playing the track returned by Lavalink
	player.updateVoiceState(message.member.voiceChannelID, { selfdeaf: false })
	player.play(song.track);
	
	databaseManager.query(db, 'SELECT guild_id FROM playing_on WHERE guild_id = ' + message.guild.id,
		[],
		checkSQLGuildEntry,
		{
			'guild_id': message.guild.id,
			'channel': message.member.voiceChannelID,
			'stream_url': radio.stream_url,
			'playing': true
		})
	
	// eslint-disable-next-line quotes
	logger.info(`Successfully playing a web radio on ${message.guild.name} (${message.guild.id}) - Radio: ${radio.name}`)
	
	// Error not good
	player.once('error', logger.error);
	// End? uhhh should not happen... lmao
	player.once('end', async data => {
		logger.warn(`Web radio stopped on ${message.guild.name} (${message.guild.id}) - Radio: ${radio.name}`)
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

/**
 * Checking if the guild has an entry in the table and inserting it if it has not.
 *
 * @param {Array} row - Result of the SQL query
 * @param radio - Object with necessary values for inserting / updating the guild in the table
 *
 * */
function checkSQLGuildEntry(row, radio) {
	
	if(row.length === 0) {
		// Adding the server to the table
		databaseManager.query(db, `INSERT INTO playing_on VALUES (${radio.guild_id}, ${radio.channel}, "${radio.stream_url}", ${radio.playing})`, [], null)
		logger.info(`New server (${radio.guild_id}) added to the table.`)
	} else {
		// Updating the stream_url and channel id when guild does already exists in the local database
		databaseManager.query(db, `UPDATE playing_on SET stream_url = "${radio.stream_url}", channel = ${radio.channel} WHERE guild_id = ${radio.guild_id}`, [], null)
		logger.info(`Updated server (${radio.guild_id}) in the table.`)
	}
}