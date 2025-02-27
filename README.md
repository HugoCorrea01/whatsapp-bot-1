# WhatsApp Bot 🤖

Este projeto é um chatbot para WhatsApp desenvolvido com `whatsapp-web.js`. Ele permite interações automáticas, envio de arquivos, integração com a API do ChatGPT e armazenamento de mensagens no Notion.

## 📌 Funcionalidades
- Respostas automáticas personalizadas
- Menu interativo
- Envio de arquivos (PDF, imagens, áudios)
- Integração com a API do ChatGPT
- Integração com Notion para armazenamento de mensagens
- Suporte a comandos personalizados

## 🚀 Configuração

### 1️⃣ Pré-requisitos
Certifique-se de ter instalado:
- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [WhatsApp Web](https://web.whatsapp.com/)

### 2️⃣ Clonando o Repositório
```sh
git clone https://github.com/HugoCorrea01/whatsapp-bot.git
cd whatsapp-bot
```

### 3️⃣ Instalando Dependências
```sh
npm install
```

### 4️⃣ Configurando o Ambiente
Crie um arquivo `.env` e adicione suas credenciais:
```env
OPENAI_API_KEY=your_openai_api_key
NOTION_API_KEY=your_notion_api_key
```

### 5️⃣ Executando o Bot
```sh
node index.js
```
Escaneie o QR Code com o WhatsApp para conectar.

## 📜 Comandos Disponíveis
- `ajuda` - Exibe a lista de comandos disponíveis
- `horário` - Exibe os horários de atendimento
- `menu` - Mostra o menu interativo
- `pdf` - Envia um arquivo PDF
- `imagem` - Envia uma imagem
- `audio` - Envia um áudio
- `/chat <mensagem>` - Responde usando a API do ChatGPT

## ⚙️ GitHub Actions
Para manter o bot rodando continuamente, configuramos um workflow do GitHub Actions. Ele automaticamente inicia o bot em um servidor sempre que houver atualizações.

### 📌 Configuração do GitHub Actions
1. Vá para `Settings > Secrets and variables > Actions`
2. Adicione os seguintes secrets:
   - `OPENAI_API_KEY`
   - `NOTION_API_KEY`
   - `WHATSAPP_SESSION`

Agora, o bot será executado automaticamente ao ser atualizado no repositório.

## 🤝 Contribuição
Sinta-se à vontade para contribuir! Faça um fork do repositório e envie um pull request.

## 📄 Licença
Este projeto está sob a licença MIT.

