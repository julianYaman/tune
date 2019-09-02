# Contributing

If you are interested into contributing to this project, feel free to fork this repository and to submit a pull request with
the changes you made. In future, a special code style will be enforced in all JavaScript files.

**The main recommendation is to use *ESLint* for the code style. You can lint with `npm run make-ready`**

## Checklist and Contributing guidelines

1. Fork & `git clone` the repository
2. Make sure you are on the **master** branch.

### Setup the project

3. Install all modules

```ssh
npm install
```

4. Install [Lavaplayer](https://github.com/sedmelluq/lavaplayer)

For downloading [Lavaplayer](https://github.com/sedmelluq/lavaplayer), please go to [the CI server](https://ci.fredboat.com/viewLog.html?buildId=lastSuccessful&buildTypeId=Lavalink_Build&tab=artifacts&guest=1).

5. Setup Lavaplayer

For setting Lavaplayer up, you need to create a ``application.yml`` YAML file in your Lavaplayer directory.

Here is an [example how it can look like](https://github.com/Frederikam/Lavalink/blob/master/LavalinkServer/application.yml.example).

Run it with
```
java -jar Lavalink.jar
```
when you want to start the bot later. (you may need two terminals for testing or use `screen` on Linux for production usage)

6. Create a config file

Create a ``config.js`` config file in the working directory of the bot.
Here is an [example](https://github.com/julianYaman/tune/blob/master/example.config.js) how it need to look like.


7. *Optionally, you can create a development branch for your changes.*
The name should contain the type of change you are doing (e.g. `update-xyz-command`). *You don't have to do this.*
8. Code what you want. (Read **What you need to consider when you code**)
9. Try out your changes and new features with `npm run dev` (nodemon should be installed before using this command).
10. Fix linting issues from ESLint manually or with `npm run make-ready`.
11. [Submit a pull request.](https://github.com/julianYaman/tune/pull/new/master)

When you submit a pull request, please follow the template.