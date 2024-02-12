const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

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
            console.log(presence);

            // Check if the user has presence
            if (presence) {
                // Get the user's status
                const status = presence.status;
                const activity = presence.activities;

                if(activity.includes(activity[0])) {
                    const activityName = activity[0].name;
            
                    // inside a command, event listener, etc.
                    const exampleEmbed = new EmbedBuilder()
                    .setColor(0x0087FF)
                    .setTitle(`${user.globalName}`)
                    .setAuthor({ name: `${user.username}`, iconURL: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`})
                    .setDescription(`User information for **${user.username}**:`)
                    .setThumbnail(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`)
                    .addFields(
                        { name: 'Bot:', value: `${isBot}`, inline: true },
                        { name: 'Status:', value: `${status}`, inline: true },
                        { name: 'Activity:', value: `${activityName}`, inline: true },
                    )
                    .setTimestamp()
                    .setFooter({ text: 'Using /user_info' });
                    
                    await interaction.reply({ embeds: [exampleEmbed] });
                }
                else {
                    // Reply with user information
                    const exampleEmbed = new EmbedBuilder()
                    .setColor(0x0087FF)
                    .setTitle(`${user.globalName}`)
                    .setAuthor({ name: `${user.username}`, iconURL: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`})
                    .setDescription(`User information for **${user.username}**:`)
                    .setThumbnail(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`)
                    .addFields(
                        { name: 'Bot:', value: `${isBot}`, inline: true },
                        { name: 'Status:', value: `${status}`, inline: true },
                    )
                    .setTimestamp()
                    .setFooter({ text: 'Using /user_info' });
                    
                    await interaction.reply({ embeds: [exampleEmbed] });
                }
                
            } 
            /*
            else {
                interaction.reply(`User information for **${user.globalName}**:\nBot: ${isBot}\nStatus: Not available`);
                
            }
            */
        } catch (error) {
            console.error(error);
            
            // Check for specific error codes
            const exampleEmbed = new EmbedBuilder()
                .setColor(0xC80000)
                .setDescription('**Error**: Something went wrong... \nPlease try again later.')
            interaction.reply({ embeds: [exampleEmbed] });
        }
    },
};
