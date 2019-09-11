// // Load up the discord.js library. Else throw an error.
// try {
// 	// eslint-disable-next-line no-var
// 	var Discord = require('discord.js')
// 	if (process.version.slice(1).split('.')[0] < 8) {
// 		throw new Error('Node 8.0.0 or higher is required. Please upgrade / update Node.js on your computer / server.')
// 	}
// }
// catch (e) {
// 	console.error(e.stack)
// 	console.error('Current Node.js version: ' + process.version)
// 	console.error('In case you´ve not installed any required module: \nPlease run \'npm install\' and ensure it passes with no errors!')
// 	process.exit()
// }

const { Client, Collection } = require('discord.js');

// Create a config file like the example-config.json
// Put EXPERIMENTAL to 1 if you are developing!
const { TOKEN, PREFIX, VERSION, NODES } = require('./config.js')

const { PlayerManager } = require('discord.js-lavalink');
const fs = require('fs');

const logger = require('./modules/logger')

// Database stuff
const databaseManager = require('./modules/database-manager')

const db = databaseManager.init()
databaseManager.query(db, `SELECT name FROM sqlite_master WHERE type='table' AND name='playing_on'`, [], databaseManager.checkTableExistence, 'playing_on')

class MusicClient extends Client {
	
	constructor(...args) {
		super(...args);
		
		this.player = null;
		
		this.on('ready', () => {
			this.player = new PlayerManager(client, NODES, {
				user: client.user.id,
				shards: 0,
			});
			
			console.log('#####################\nStarting Bot...\nNode version: ' + process.version + '\n#####################\n')
			console.log(client.user.username + ' is online! Running on v' + VERSION)
			console.log(`Ready to serve on ${client.guilds.size} servers for a total of ${client.users.size} users.`)
			logger.info('Bot is online!');
		}).on('error', console.error).on('warn', console.warn);
	}
	
}
const client = new MusicClient();

// Creating a collection for the commands
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

client.on('ready', async () => {
	client.user.setPresence({
		status: 'online',
		game: {
			name: `radio music on ${client.guilds.size} servers! ${PREFIX}help`,
		},
	}).catch(e => {
		console.error(e)
	})
})

client.on('disconnect', () => logger.error('Disconnected!'))

client.on('reconnecting', () => logger.warn('Reconnecting...'))

// This event triggers only when the bot joins a guild.
client.on('guildCreate', guild => {
	logger.info(`Joined a new guild -> ${guild.name}. (id: ${guild.id}) This guild has ${guild.memberCount} members!`)
	client.user.setPresence({
		game: {
			name: `radio music on ${client.guilds.size} servers! ${PREFIX}help`,
		},
	}).catch(e => {
		console.error(e)
	})
})

// This event triggers only when the bot is removed from a guild.
client.on('guildDelete', guild => {
	logger.info(`I have been removed from -> ${guild.name}. (id: ${guild.id})`)
	client.user.setPresence({
		game: {
			name: `radio music on ${client.guilds.size} servers! ${PREFIX}help`,
		},
	}).catch(e => {
		console.error(e)
	})
})

client.on('message', async message => {
	if (message.isMentioned(client.user)) {
		// Send the message of the help command as a response to the user
		client.commands.get('help').execute(message, null, { PREFIX, VERSION })
	}

	if (message.author.bot || !message.guild) return
	if (!message.content.startsWith(PREFIX)) return undefined

	const args = message.content.split(' ')

	const command = args[0].toLowerCase().slice(PREFIX.length)

	args.shift()

	// TODO: What should the bot do with an unknown command?
	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args, { PREFIX, VERSION }, client);
	}
	catch (error) {
		logger.error(error);
		await message.reply('there was an error trying to execute that command!');
	}

})

client.login(TOKEN).catch(e => console.log(e))

process.on('unhandledRejection', (PromiseRejection) => console.error(`Promise Error -> ${PromiseRejection}`))
