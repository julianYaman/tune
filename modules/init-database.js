/**
 * @fileOverview Initiating the main database and creating the table used for this project.
 * TODO: Better visualization of the setup process with better looking console output
 * TODO: Better looking console output for incoming errors
 * */
const sqlite3 = require('sqlite3').verbose();
const logger = require('./logger')
const clc = require('cli-color')

// Little fun thing here
process.stdout.write(clc.reset);

// Connecting to the database
let db = new sqlite3.Database('tune', (err) => {
	if (err) {
		return console.error(clc.red(err.message))
	}
	console.log('[1/4] Connected to the SQlite database.')
	console.log('[2/4] Creating table for the first time!')
})

// Creating the table playing_on
db.run('CREATE TABLE playing_on(guild_id integer, channel text, stream_url text, playing boolean)', [], err => {
	if (err) {
		return console.error(clc.red('[3/4] ' + err.message))
	}
	console.log(clc.green('[3/4] Created successfully the new table with the name playing_on'))
})


// Closing the connection after everything was done.
db.close((err) => {
	if (err) {
		return console.error(clc.red('[4/4] ' + err.message));
	}
	console.log(clc.green('[4/4] Closed successfully the connection to the database.'))
});
