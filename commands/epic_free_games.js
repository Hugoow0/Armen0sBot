const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');

const axios = require('axios');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('epicfreegames')
        .setDescription('Ask the bot about the actual Epic Free Games of the week.'),

    async execute(interaction) {

        const options = {
            method: 'GET',
            url: 'https://free-epic-games.p.rapidapi.com/free',
            headers: {
                'X-RapidAPI-Key': '145693cc22mshaf4a6e7ebb0489ep1d5844jsn05583a727d4a',
                'X-RapidAPI-Host': 'free-epic-games.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            console.log(response.data.freeGames.current.length);

            const EmbedEpicFreeGames = new EmbedBuilder()
                .setColor(0x222222)
                .setTitle('Epic Free Games')
                .setURL('https://store.epicgames.com/fr/')
                .setAuthor({ name: 'Epic Games', iconURL: 'https://logodownload.org/wp-content/uploads/2020/10/epic-games-logo-1.png', url: 'https://www.epicgames.com/' })
                .setDescription('__**EpicGames shop**__ : https://store.epicgames.com/')
                .setThumbnail('https://logodownload.org/wp-content/uploads/2020/10/epic-games-logo-1.png')
                .addFields({ name: '\u200B', value: '\u200B' })
                .setTimestamp()
                .setFooter({ text: 'Epic Games', iconURL: 'https://logodownload.org/wp-content/uploads/2020/10/epic-games-logo-1.png' })
            ;

            for (var responseKey of response.data.freeGames.current) {

                EmbedEpicFreeGames.addFields(
                    {name: 'Title', value: responseKey.title.toString()},
                    { name: 'Description', value: responseKey.description },
                    { name: '\u200B', value: '\u200B' })
                EmbedEpicFreeGames.setImage(responseKey.keyImages[0].url)

            }




            await interaction.reply({ embeds: [EmbedEpicFreeGames]});



        } catch (error) {
            console.error(error);
            interaction.reply(`Erreur : ${error.message}`);

        }

    }
}

