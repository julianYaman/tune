/**
 * @fileOverview Initiating the main database and creating the table used for this project.
 * TODO: Better visualization of the setup process with better looking console output
 * TODO: Better looking console output for incoming errors
 * */
const sqlite3 = require('sqlite3').verbose();

// Connecting to the database
let db = new sqlite3.Database('tune', (err) => {
	if (err) {
		return console.error(err.message)
	}
	console.log('Connected to the SQlite database.')
	console.log('Creating table for the first time!')
})

// Creating the table playing_on
db.run('CREATE TABLE playing_on(guild_id integer, channel text, stream_url text)', [], err => {
	if (err) {
		return console.error(err.message)
	}
	console.log('Created successfully the new table with the name playing_on')
})

// Closing the connection after everything was done.
db.close((err) => {
	if (err) {
		return console.error(err.message);
	}
	console.log('Closed the connection to the database.')
});
