const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('0029VahusSh0QeaoFzHJCk2x')
const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: Wasi_Tech,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require("@whiskeysockets/baileys");

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};
const { readFile } = require("node:fs/promises")

router.get('/', async (req, res) => {
	const id = makeid();
	async function WASI_MD_QR_CODE() {
		const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id)
		try {
			let Qr_Code_By_Wasi_Tech = Wasi_Tech({
				auth: state,
				printQRInTerminal: false,
				logger: pino({ level: "silent" }),
				browser: Browsers.macOS("Desktop"),
			});

			Qr_Code_By_Wasi_Tech.ev.on('creds.update', saveCreds)
			Qr_Code_By_Wasi_Tech.ev.on("connection.update", async (s) => {
				const { connection, lastDisconnect, qr } = s;
				if (qr) await res.end(await QRCode.toBuffer(qr));

				if (connection == "open") {
					await delay(5000);
					let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
					await delay(800);
					let b64data = Buffer.from(data).toString('base64');
					let session = await Qr_Code_By_Wasi_Tech.sendMessage(Qr_Code_By_Wasi_Tech.user.id, { text: '' + b64data });

					let KAYA_MD_TEXT = `
*_Session Connected By KAYA MD_*
*_Made With ❤️‍🔥 by Kaya_*
______________________________________
╔════◇
║ *『 YOU'VE SUCCESSFULLY CONNECTED KAYA MD 』*
║ _Welcome to your personal WhatsApp bot environment._
╚════════════════════════╝
╔═════◇
║  『••• 𝗩𝗶𝘀𝗶𝘁 & Support •••』
║❒ *YouTube:* _https://www.youtube.com/@KayaZone_
║❒ *Owner:* https://wa.me/2348075952205_
║❒ *GitHub:* _https://github.com/Fearless-tech1_
║❒ *WaGroup:* _https://chat.whatsapp.com/C3GFThC0tIpGaJY9DFUeCK_
║❒ *WaChannel:* _https://whatsapp.com/channel/0029VahusSh0QeaoFzHJCk2x_
║❒ *Plugins:* _https://github.com/Fearless-tech1_
╚════════════════════════╝
_____________________________________

_Thank you for choosing **KAYA MD**. Don't forget to ⭐ the repo!_
					`;
					await Qr_Code_By_Wasi_Tech.sendMessage(Qr_Code_By_Wasi_Tech.user.id, { text: KAYA_MD_TEXT }, { quoted: session })

					await delay(100);
					await Qr_Code_By_Wasi_Tech.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					WASI_MD_QR_CODE();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({ code: "Service is Currently Unavailable" });
			}
			console.log(err);
			await removeFile("temp/" + id);
		}
	}
	return await WASI_MD_QR_CODE()
});
module.exports = router