const sqlite3 = require('sqlite3').verbose();
const logger = require('./logger')

exports.init = () => {
	let db = new sqlite3.Database('tune', (err) => {
		if (err) {
			return logger.error(err.message)
		}
		logger.info('Connected to the SQlite database (tune).')
	})
	
	return db
}

exports.close = (db) => {
	db.close((err) => {
		if (err) {
			return console.error(err.message);
		}
		logger.info('Close the database connection.');
	});
}

exports.query = (db, sql, callback) => {
	db.all(sql, [], (err, rows) => {
		if (err) {
			throw err
		}
		callback(rows)
	})
}