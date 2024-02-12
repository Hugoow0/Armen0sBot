const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('annoy')
        .setDescription('Annoy an user')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('Need a user to test')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('text')
                .setDescription('The text to send')
                .setRequired(true)
        ),
        

    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        const message = interaction.options.getString('text');
        console.log(message);


        // Check if the user is a bot
        const isBot = user.bot;


        try {
            if (!isBot) {
                // Create a DM channel with the user
                const dmChannel = await user.createDM();

                // Send a message to the user's DM
                await dmChannel.send(message);

                interaction.reply(`Message sent to ${user.username} !\n Message :\n${message}`);
            } else {
                interaction.reply('I can\'t annoy a bot.');
            }
        } catch (error) {
            console.error(error);
            interaction.reply('An error occurred while trying to annoy.');
        }
    }
};
