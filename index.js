const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");

const TelegaBot = require('telega-bot');
const bot = new TelegaBot('1941890783:AAHfHb3HJ3l-REyun7CbCj3m6fnbc_-fioA');

app.use(cors());
const PORT = process.env.PORT || 5000;

bot.start();

const API1 = 'https://cataas.com/cat/cute';
const API2 = 'https://cataas.com/cat/gif';

bot.on('text', function (msg) {
    console.log(msg)
    console.log(`[text] ${msg.chat.id} ${msg.text}`);
});


bot.on(['/cat', '/catgif'], function (msg) {

    let promise;
    let id = msg.chat.id;
    let cmd = msg.text.split(' ')[0];

    // Photo or gif?
    if (cmd == '/cat') {
        promise = bot.sendPhoto(id, API1, {
            fileName: 'cataas.jpg',
            serverDownload: true
        });
    } else {
        promise = bot.sendDocument(id, API2, {
            fileName: 'cataas.gif',
            serverDownload: true
        });
    }

    // Send "uploading photo" action
    bot.sendAction(id, 'upload_photo');

    return promise.catch(error => {
        console.log('[error]', error);
        // Send an error
        bot.sendMessage(id, `😿 Вышла ошибочка, попробуйте позже.\n${error.description}`);
    });

});

bot.on('/start', (msg) => {
    return msg.reply.text('Привет, напиши /cat или /catgif чтобы получить милости', { asReply: true });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));