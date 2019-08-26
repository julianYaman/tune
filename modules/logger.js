const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json } = format;

const logger = createLogger({
	format: combine(
		timestamp(),
		json()
	),
	transports: [
		new (transports.Console)(),
		new transports.File({ filename: 'logs/combined.log' }),
		new transports.File({ filename: 'logs/error.log', level: 'error' }),
		new transports.File({ filename: 'logs/debug.log', level: 'debug' })
	]
})

module.exports = logger