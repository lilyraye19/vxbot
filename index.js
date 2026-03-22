const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on('ready', () => {
  console.log(`ログイン成功: ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const regex = /(https?:\/\/)(x\.com|twitter\.com)\/\S+/g;

  if (regex.test(message.content)) {
    const newContent = message.content.replace(regex, (url) => {
      return url
        .replace(/(https?:\/\/)(x\.com|twitter\.com)/, '$1vxtwitter.com');    });

    await message.channel.send(
  `【${message.author.displayName}】\n${newContent}`
);

    await message.delete(); // 元のメッセージ消す
  }
});

client.login(process.env.TOKEN);
