const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors');

const TelegaBot = require('telega-bot');
const bot = new TelegaBot('1941890783:AAHfHb3HJ3l-REyun7CbCj3m6fnbc_-fioA');

app.use(cors());
const PORT = process.env.PORT || 5000;

bot.start();

const API1 = process.env.API1;
const API2 = process.env.API2;
const API3_SECRET = process.env.API3_SECRET;
const API4_SECRET = process.env.API4_SECRET;

const sendSecretIMG = (apiUrl) => {
  const number = Math.random() < 0.03;
  const phraseAPIURL = Math.random() < 0.5 ? API3_SECRET : API4_SECRET;

  if (number) {
    return phraseAPIURL;
  }

  return apiUrl;
};

bot.on('text', (msg) => {
  console.log(msg);
  console.log(`[text] ${msg.chat.id} ${msg.text}`);
});

bot.on(['/cat', '/catgif'], (msg) => {
  let promise;
  let id = msg.chat.id;
  let cmd = msg.text.split(' ')[0];

  if (cmd == '/cat') {
    promise = bot.sendPhoto(id, sendSecretIMG(API1), {
      fileName: 'cataas.jpg',
      serverDownload: true,
    });
  } else {
    promise = bot.sendDocument(id, sendSecretIMG(API2), {
      fileName: 'cataas.gif',
      serverDownload: true,
    });
  }

  bot.sendAction(id, 'upload_photo');

  return promise.catch((error) => {
    console.log('[error]', error);
    bot.sendMessage(id, `😿 Вышла ошибочка, попробуйте позже.\n${error.description}`);
  });
});

bot.on('/start', (msg) => {
  return msg.reply.text('Привет, напиши /cat или /catgif чтобы получить милости', {
    asReply: true,
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
