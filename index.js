const {token} = require('./config.json');
const {Client, Events, GatewayIntentBits, Collection, ActivityType} = require('discord.js');
const fs = require('node:fs');

const client = new Client({intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages
    ]
});

client.commands = getCommands('./commands');

client.once(Events.ClientReady, (c) => {
    console.log(`Logged in as ${c.user.tag}!`);
    client.user.setActivity("⏳ In development...", {type: ActivityType.Custom});
    client.user.setStatus("idle");
});

client.login(token);





client.on(Events.InteractionCreate, (interaction) => {
    if(!interaction.isChatInputCommand()) return;

    let commmand = client.commands.get(interaction.commandName);

    try {
        if(interaction.replied) return;
        commmand.execute(interaction);
    } catch(error) {
        console.error(error);
    }
});


function getCommands(dir) {
    let commands = new Collection();
    const commandFiles = getFiles(dir);

    for(const commandFile of commandFiles) {
        const command = require(commandFile);
        commands.set(command.data.toJSON().name, command);
    }
    //console.log(commands);
    return commands;
}

function getFiles(dir) {
    const files = fs.readdirSync(dir, {
        withFileTypes: true
    });
    let commandFiles = [];

    for(const file of files) {
        if(file.isDirectory()) {
            commandFiles = [
                ...commandFiles,
                ...getFiles(`${dir}/${file.name}`)
            ]
        } else if(file.name.endsWith(".js")) {
            commandFiles.push(`${dir}/${file.name}`);
        }
    }

    console.log(commandFiles);
    return commandFiles;
}