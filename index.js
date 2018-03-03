const Serial = require('./Serial');
const serial = new Serial('/dev/cu.usbmodem1411', { baudRate: 9600 });

const TelegramBot = require('node-telegram-bot-api');
const token = require('./token');
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (message) => {
    const chatId = message.chat.id;

    console.log(message.text);

    switch (message.text) {
        case 'enable LED': {
            serial.sendMessage(message.text)
                .then(() => bot.sendMessage(chatId, 'LED enabled'));
            break;
        }
        case 'disable LED': {
            serial.sendMessage(message.text)
                .then(() => bot.sendMessage(chatId, 'LED disabled'));
            break;
        }
        default:
            bot.sendMessage(chatId, 'choose an action', {
                reply_markup: {
                    keyboard: [
                        ['enable LED'],
                        ['disable LED']
                    ],
                    resize_keyboard: true
                }
            });
    }
});
