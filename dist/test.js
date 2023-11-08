const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '6630470146:AAHKxRgt0-dkfeV4vCaGj3afshe7aONOkgI';
const webAppUrl = 'https://lecompay.netlify.app/';
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;


  if(text === '/start') {
    await bot.sendMessage(chatId, 'Hello  Chief <3 :) ', {
      reply_markup: {
        keyboard: [
          [{text: 'Open App ! and --> tip /pay for run payment !', web_app: {url:webAppUrl}}]
        ]
      }
    })
    
  }


});
