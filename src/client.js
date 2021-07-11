const { Client, Collection } = require("discord.js");

module.exports = class extends Client {
	constructor() {
		super();
		this.config = require("./config");

		this.logger = require("./common").Logger;

		this.commands = new Collection();

	}

};