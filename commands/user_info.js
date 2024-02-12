const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user_info')
        .setDescription('Get information about an user')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The user you want to get information about.')
                .setRequired(true)
        ),

    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        console.log(user);

        // Check if the user is a bot
        const isBot = user.bot ? 'Yes' : 'No';

        try {
            // Fetch the member to ensure presence is available
            const member = await interaction.guild.members.fetch(user.id);

            // Get the user's presence
            const presence = member.presence;

            // Check if the user has presence
            if (presence) {
                // Get the user's status
                const status = presence.status;
                const activity = presence.activities;

                if(activity.includes(activity[0])) {
                    const activityName = activity[0].name;
                    interaction.reply(`User information for **${user.globalName}**:\n Bot: ${isBot}\n Status: ${status}\n Activity: ${activityName}`);
                }
                else {
                    // Reply with user information
                    interaction.reply(`User information for **${user.globalName}**:\nBot: ${isBot}\nStatus: ${status}`);
                }
                
            } else {
                interaction.reply(`User information for **${user.globalName}**:\nBot: ${isBot}\nStatus: Not available`);
            }
        } catch (error) {
            console.error(error);
            
            // Check for specific error codes
            interaction.reply('Something went wrong... \nPlease try again later.');
        }
    },
};
