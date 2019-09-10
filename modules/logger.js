const { createLogger, format, transports } = require('winston');
const { combine, colorize, printf } = format;
const moment = require('moment')

// eslint-disable-next-line no-shadow
const myFormat = printf(({ level, message}) => {
	// eslint-disable-next-line no-shadow
	const timestamp = moment().format('YYYY-MM-DD HH:mm:ss').trim();
	return `${timestamp} - ${level}: ${message}`
})

const logger = createLogger({
	format: combine(
		colorize(),
		myFormat
	),
	transports: [
		new (transports.Console)(),
		new transports.File({ filename: 'logs/combined.log' }),
		new transports.File({ filename: 'logs/error.log', level: 'error' }),
		new transports.File({ filename: 'logs/debug.log', level: 'debug' })
	]
})

module.exports = logger