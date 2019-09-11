# Docs / Bot Owner

*Tune* also offers to be hosted on your own server. This page will just help you to set up 
the bot easily and fast.

## Setup the bot

### - Install [node.js and npm](https://nodejs.org/en/)

### - Install [SQLite](https://sqlite.org/download.html)

### - Clone or download the latest [stable release](https://github.com/julianYaman/tune/releases) of the bot

###  - Install all modules

```ssh
npm install
```

### - Install [Lavaplayer](https://github.com/sedmelluq/lavaplayer)

For downloading [Lavaplayer](https://github.com/sedmelluq/lavaplayer), please go to [the CI server](https://ci.fredboat.com/viewLog.html?buildId=lastSuccessful&buildTypeId=Lavalink_Build&tab=artifacts&guest=1).

### - Setup Lavaplayer

For setting Lavaplayer up, you need to create a ``application.yml`` YAML file in your Lavaplayer directory.

Here is an [example how it can look like](https://github.com/Frederikam/Lavalink/blob/master/LavalinkServer/application.yml.example).

Change ``host`` with your servers' IP address and ``port`` with an available port on your server.

Also, for security reasons, change ``password`` with your own password.

Run it with
```
java -jar Lavalink.jar
```
when you want to start the bot later.

### - Setup the database and the table
```
npm run setup
```
Run this command to setup the database for the bot and to create the table in the database.

The console output will show you if it was successfully created or if an error happened.

### - Create a config file

Create a ``config.js`` config file in the directory of the bot.
Here is an [example](https://github.com/julianYaman/tune/blob/master/example.config.js) how it need to look like.

You also need to add your host, your port and your password inside the ``NODES`` property from before.

<hr>

You may add your own radios to the ``radios.js`` list or remove some of them. You could also create your own list
with your own classification and classify the radios with something else than genres. *(optional)*

Please check out the **Commands** section under the checklist.

*I recommend using [**pm2**](http://pm2.keymetrics.io/) to run your bot on a server.*

If some problems occur while trying to run the bot, you can write an [**issue**](https://github.com/julianYaman/tune/issues/new/choose) 
and describe the problem you have. Only bot-related issues will be answered and not something related to a package or to your server.

## Commands

You may delete following commands since they won't be useful for you:

- ``info`` 
- ``vote``

At the end, it is your own decision if you delete them. You can also use them for any other purpose you want.

Also you should change the content of the ``help`` command, especially 
if you have your own commands or your own prefix. You can personalize the content as much as you want.

I would appreciate, if you could credit and mention the original repository or embedding a link to
the official web site of the bot.

You could add following field to the ``help`` embed:

```
{
  name: "Official Repository",
  value: "[Click here](https://discord.gg/MezQAQT) to go to the official repository of *Tune*."
}
```

## Miscellaneous

I appreciate it very much, that you use the bot. You have all choices to customize the bot as long you are giving 
mention the author and embed a link to the repository or to the official Tune web page *(e.g. in the help command)*.
