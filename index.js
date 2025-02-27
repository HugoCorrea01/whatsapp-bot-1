const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

const client = new Client({
    authStrategy: new LocalAuth(),
});

// Exibe o QR Code no terminal
client.on('qr', qr => {
    console.log('📱 Escaneie este QR Code com seu WhatsApp:');
    qrcode.generate(qr, { small: true });
});

// Confirma conexão
client.on('ready', () => {
    console.log('✅ Bot conectado com sucesso!');
});

// Mensagem de boas-vindas para novos contatos
client.on('message', async msg => {
    if (['oi', 'olá', 'ola','OI','OLA','OLÁ'].includes(msg.body.toLowerCase())) {
        msg.reply('Olá! 🧑‍💻 Como posso te ajudar? Digite *ajuda* para ver os comandos disponíveis.');
    }
});

// Responder a comandos
client.on('message', async msg => {
    const message = msg.body.toLowerCase(); // Converte para minúsculas

    if (message === 'ajuda') {
        msg.reply(
            `🤖 *Lista de Comandos* 🤖\n\n` +
            `✅ *ajuda* - Mostra os comandos disponíveis\n` +
            `✅ *horário* - Exibe os horários de atendimento\n` +
            `✅ *menu* - Abre o menu interativo\n` +
            `✅ *pdf* - Envia um arquivo PDF\n` +
            `✅ *imagem* - Envia uma imagem\n` +
            `✅ *audio* - Envia um áudio\n` +
            `✅ *chat* - faça uma pergunta\n`
        );
    } 
    
    else if (message === 'horário') {
        msg.reply('🕒 Nosso horário de atendimento é das 8h às 18h.');
    } 
    
    else if (message === 'menu') {
        sendMenu(msg);
    } 
    
    else if (message === 'pdf') {
        sendPDF(msg);
    }

    else if (message === 'imagem') {
        sendImage(msg);
    }

    else if (message === 'audio') {
        sendAudio(msg);
    }
});
require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Função para obter resposta do ChatGPT
async function getChatGPTResponse(prompt) {
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // Ou gpt-4, se disponível
        messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content;
}

// Quando receber uma mensagem, responde com a API do ChatGPT
client.on('message', async msg => {
    if (msg.body.startsWith('/chat ')) {
        const pergunta = msg.body.replace('/chat ', '');
        const resposta = await getChatGPTResponse(pergunta);
        msg.reply(resposta);
    }
});



// Função para enviar um menu interativo
async function sendMenu(msg) {
    const menuMessage =
        `📋 *Menu Interativo* 📋\n\n` +
        `1️⃣ Digite *1* para saber mais sobre nossos serviços\n` +
        `2️⃣ Digite *2* para falar com um atendente\n` +
        `3️⃣ Digite *3* para sair\n`;

    msg.reply(menuMessage);
}

// Responder às opções do menu
client.on('message', async msg => {
    const message = msg.body;

    if (message === '1') {
        msg.reply('📌 Nossos serviços incluem atendimento personalizado e suporte técnico. Quer saber mais? 😊');
    } 
    
    else if (message === '2') {
        msg.reply('👨‍💻 Um atendente entrará em contato em breve.');
    } 
    
    else if (message === '3') {
        msg.reply('✅ Você saiu do menu. Digite /menu se precisar de ajuda novamente.');
    }
});

// Função para enviar um PDF
async function sendPDF(msg) {
    const pdf = MessageMedia.fromFilePath('files/exemplo.pdf'); // Arquivo na pasta "files"
    msg.reply(pdf, msg.from, { caption: '📄 Aqui está seu arquivo PDF!' });
}

// Função para enviar uma imagem
async function sendImage(msg) {
    const image = MessageMedia.fromFilePath('files/imagem.jpg'); // Arquivo na pasta "files"
    msg.reply(image, msg.from, { caption: '🖼️ Aqui está a imagem!' });
}

// Função para enviar um áudio
async function sendAudio(msg) {
    const audio = MessageMedia.fromFilePath('files/audio.mp3'); // Arquivo na pasta "files"
    msg.reply(audio, msg.from, { sendAudioAsVoice: true }); // Envia como mensagem de voz
}

// Inicia o bot
client.initialize();
