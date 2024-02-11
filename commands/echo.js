const { SlashCommandBuilder } = require('discord.js');

module.exports = {
        data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Echo the prompted text and the user')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('Need a user to test')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('text')
                .setDescription('The text to repeat')
                .setRequired(true)
        ),

        async execute(interaction){
            const text = interaction.options.getString('text');
            const user = interaction.options.getUser('user');
            interaction.reply(`**${user.username}** : ${text}`);
        }
}

