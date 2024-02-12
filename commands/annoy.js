const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('annoy')
        .setDescription('Annoy an user')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The user to annoy')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('text')
                .setDescription('The text to send')
                .setRequired(true)
        ),
        

    async execute(interaction) {
        const userAuthor = interaction.user;
        const userTarget = interaction.options.getUser('user');
        const message = interaction.options.getString('text');
        console.log(message);


        // Check if the user is a bot
        const isBot = userTarget.bot;


        try {
            if (!isBot) {
                // Create a DM channel with the user
                const dmChannel = await userTarget.createDM();

                // Send a message to the user's DM
                await dmChannel.send(message);

                //interaction.reply(`Message sent to ${user.username} ! \n**Message :** \n*${message}*`);

                const exampleEmbed = new EmbedBuilder()
                    .setColor(0x43D623)
                    .setTitle(`MSG: ${userAuthor.globalName} -> ${userTarget.globalName}`)
                    .setAuthor({ name: `${userAuthor.username}`, iconURL: `https://cdn.discordapp.com/avatars/${userAuthor.id}/${userAuthor.avatar}.png`})
                    .setDescription(`Message sent to **${userTarget.globalName}** !:`)
                    //.setThumbnail(`https://cdn.discordapp.com/avatars/${userAuthor.id}/${userAuthor.avatar}.png`)
                    .addFields(
                        { name: 'Author:', value: `${userAuthor.globalName}`, inline: true },
                        { name: 'Target:', value: `${userTarget.globalName}`, inline: true },
                        { name: 'Message:', value: `${message}` },
                    )
                    .setTimestamp()
                    .setFooter({ text: 'Using /annoy' });
                    
                interaction.reply({ embeds: [exampleEmbed] });

            } else {
                const exampleEmbed = new EmbedBuilder()
                    .setColor(0xC80000)
                    .setDescription('**Error**: I can\'t annoy a bot.')
                interaction.reply({ embeds: [exampleEmbed] });
            }
        } catch (error) {
            console.error(error);
            interaction.reply('An error occurred while trying to annoy.');
        }
    }
};
