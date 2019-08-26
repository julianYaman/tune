// Any module required will be written up here

/**
 * Command: leave
 * Description: Leaving the voice channel (if the bot is in one)
 * */
module.exports = {
	name: 'leave',
	description: 'Leaving the voice channel (if the bot is in one)',
	async execute(message, args, config, client) {
		if(!message.member.voiceChannelID) return message.reply('you are not in a voice channel.')
		await client.player.leave(message.guild.id);
		return message.reply('successfully left the voice channel')
	},
}