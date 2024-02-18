const {token, guildId, logChannleId} = require('./config.json');
const {Client, Events, GatewayIntentBits, Collection, ActivityType, Partials } = require('discord.js');
const fs = require('node:fs');

const client = new Client({
    intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.DirectMessageReactions
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.User]
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
    if(interaction.guild.id !== guildId) return;
    //console.log(interaction);

    let commmand = client.commands.get(interaction.commandName);

    try {
        if(interaction.replied) return;
        commmand.execute(interaction);
    } catch(error) {
        console.error(error);
    }
});



// Get every DMs and log them into the logsChannel
const logChannelId = logChannleId; 
client.on('messageCreate', async message => {
    
    if (message.author.bot) return; // Ignore messages from bots
    //if (message.author.id !== "???") return; // Ignore messages if not from userID

    if (!message.guild) {
        // Message is a direct message
        console.log('-\nDirect message detected');
        
        const logChannel = client.channels.cache.get(logChannelId);

        if (logChannel) {
            // Forward the direct message to the log channel
            
            console.log("From :",message.author.username, message.author.id);
            console.log('Message received: \<*', message.content, '*\> in guild:', message.guild);
            console.log('Log channel found:', logChannel.name, '\n-');
            logChannel.send(`Received DM from **${message.author.tag}**: ${message.content}`);
        } else {
            console.error(`Log channel not found with ID: ${logChannelId} \n-`);
        }
        
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