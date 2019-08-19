# Docs / Bot Owner

*Tune* also offers to be hosted on your own server. This page will just help you to set up 
the bot easily and fast.

### Checklist:

- First, you should rename ``example.config.js`` to ``config.js`` and add the values needed to run the bot by your own.
- Secondly, you may add your own radios to the ``radios.js`` list or remove some of them. You could also create your own list
with your own classification and classify the radios with something else than genres. *(optional)*
- Please check out the **Commands** section under the checklist.
- *I recommend using [**pm2**](http://pm2.keymetrics.io/) to run your bot on a server.*
- You're ready!

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
