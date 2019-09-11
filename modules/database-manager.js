const sqlite3 = require('sqlite3').verbose();
const logger = require('./logger')

/**
 * Connecting to the database.
 * */
exports.init = () => {
	let db = new sqlite3.Database('tune', (err) => {
		if (err) {
			return logger.error(err.message)
		}
		logger.info('Connected to the SQlite database (tune).')
	})
	
	return db
}

/**
 * Closing the connection to the database.
 *
 * @param {Database} db - The database connection
 * */
exports.close = (db) => {
	db.close((err) => {
		if (err) {
			return console.error(err.message);
		}
		logger.info('Close the database connection.');
	});
}

/**
 * Main method for querying data in the database
 *
 * @param {Database} db - The database connection
 * @param {String} sql - The SQL query
 * @param {Array} passedValues - Any values which needed to be passed to run the query.
 * @param {Object, Function} callback - The callback function. Can be null if no callback is needed.
 * @param callbackParameters - Any parameters needed like Strings or Objects for running the callback.
 *
 * */
exports.query = (db, sql, passedValues, callback, callbackParameters) => {
	db.all(sql, passedValues, (err, rows) => {
		if (err) {
			logger.error(err.message)
			throw err
		}
		if (callback === null) return
		callback(rows, callbackParameters)
	})
}

/**
 * Main method to check if the table for this bot does exist
 *
 * @param {Array} row - The result of the query for checking the table existence in sqlite_master.
 * @param {String} tableName - The name of the table. Needed for better console output.
 *
 * */
exports.checkTableExistence = (row, tableName) => {
	if(row.length === 0) {
		// Aborting any action when the table does not exist.
		// Run 'npm run setup' for completing the setup procedure and for fixing this problem.
		throw logger.error(`${tableName} does not exist. Bot cannot run, when database is not completely set up. Please run 'npm run setup' to fix this error.`)
	}else{
		// Notifying bot owner that the bot will run.
		logger.info(`Table ${tableName} exist. Bot can run normally.`)
	}
}