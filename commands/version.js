const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const packageJSON = require('../package.json');

    
module.exports = {
        data: new SlashCommandBuilder()
        .setName('version')
        .setDescription('Tells wich discord.js version is used.'),

        async execute(interaction){
            const discordJSVersion = packageJSON.dependencies["discord.js"];
            const author = packageJSON.author;
            const license = packageJSON.license;
            const name = packageJSON.name;
            const version = packageJSON.version;
            const description = packageJSON.description;

            const embed = new EmbedBuilder()
                .setColor(0x0087FF)
                .addFields(
                    { name: 'Name:', value: `\`${name}\``, inline: true },
                    { name: 'Author:', value: `\`${author}\``, inline: true },
                    { name: 'Description:', value: `\`${description}\``, inline: false },

                    { name: 'Version:', value: `\`${version}\``, inline: true },
                    { name: 'Discord.js version:', value: `\`${discordJSVersion}\``, inline: true },
                    { name: 'License:', value: `\`${license}\``, inline: true },
                )
            await interaction.reply({ embeds: [embed] });
        }
}

