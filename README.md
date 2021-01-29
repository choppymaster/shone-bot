[![Build Status](https://travis-ci.com/choppymaster/Shone-Bot.svg?branch=bot)](https://travis-ci.com/choppymaster/Shone-Bot)
# Shone-Bot
Discord bot for moderation and entertainment on my discord server. Currently it is only for my server. I will make it public when I learn further coding and JavaScript.
This bot is made with Node.js language. 

## Installing 
You need to create a discord bot on discord developer portal. You also need to select "bot".
**1:** Install `node.js`. You can install it by executing `pkg install nodejs` on terminal.
**2:** Install `git` by executing `pkg install git` on terminal.
**3:** Clone this repo, by executing `git clone https://github.com/choppymaster/Shone-Bot`. 
**4:** Get your credentials, a.k.a your bot's token, logchannel id, public logchannel id, and mute role id. Bot's token is on the `discord developer portal`, and channel ids can be get by sending \#your_channel_name on discord and copying the string of numbers. Role id can by get by sending \@role_name on discord.
**5:** Make a file called `.env`. The file name **must** be `.env`, not like `foo.env`. File content should be like this: 
   ```
TOKEN=your_bot_token
LOGCHANNEL=your_log_channel_id
BLOGCHANNEL=your_public_log_channel_id
MUTEROLE=your_mute_role_id
   ```
**6:** Execute `npm install` on terminal.
**7:** On terminal, type `node index.js`. 

That's it! You can start your bot.

## Contributing

If you want to contribute to this project, Feel free to open a pull request! We will run a build with a linter, to check if your contributing have conflicts.
