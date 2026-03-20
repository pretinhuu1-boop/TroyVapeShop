const fs = require('fs');
const { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, makeCacheableSignalKeyStore } = require('@whiskeysockets/baileys');
const P = require('pino');
const QRCode = require('qrcode');

const authDir = 'C:/Users/user/.openclaw/credentials/whatsapp/default';
const targetNumber = '595975402915@s.whatsapp.net';
const testMessage = 'Ola! Esta e uma mensagem de teste do TAURA Agent. Conexao estabelecida com sucesso!';

async function connectAndSend(isReconnect) {
  fs.mkdirSync(authDir, { recursive: true });
  const { state, saveCreds } = await useMultiFileAuthState(authDir);
  const { version } = await fetchLatestBaileysVersion();
  const logger = P({ level: 'warn' });

  const sock = makeWASocket({
    auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, logger) },
    version, logger,
    browser: ['Mac OS', 'Chrome', '14.4.1'],
    printQRInTerminal: false,
    syncFullHistory: false,
    markOnlineOnConnect: false,
    defaultQueryTimeoutMs: undefined,
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log('QR received! Generating image...');
      const dataUrl = await QRCode.toDataURL(qr, { width: 400, margin: 2 });
      const base64 = dataUrl.split(',')[1];
      fs.writeFileSync('C:/Users/user/Documents/projetos/troyagent/whatsapp-qr.png', Buffer.from(base64, 'base64'));
      require('child_process').execSync('start whatsapp-qr.png', { cwd: 'C:/Users/user/Documents/projetos/troyagent' });
      console.log('>>> QR OPENED! SCAN NOW in WhatsApp > Dispositivos Vinculados! <<<');
    }

    if (connection === 'open') {
      console.log('CONNECTED!');
      try {
        await sock.sendMessage(targetNumber, { text: testMessage });
        console.log('MESSAGE SENT SUCCESSFULLY!');
      } catch (e) {
        console.error('Send error:', e.message);
      }
      setTimeout(() => { sock.ws.close(); process.exit(0); }, 5000);
    }

    if (connection === 'close') {
      const code = lastDisconnect?.error?.output?.statusCode;
      console.log('Disconnected, code:', code);
      if (code === 515 && !isReconnect) {
        console.log('Restart required (normal after pairing). Reconnecting...');
        setTimeout(() => connectAndSend(true), 2000);
      } else {
        console.log('Connection failed.');
        process.exit(1);
      }
    }
  });
}

connectAndSend(false).catch(e => { console.error('ERROR:', e.message); process.exit(1); });
