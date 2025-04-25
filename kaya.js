const express = require('express');
const app = express();
__path = process.cwd()
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;

let server = require('./qr.html'),  // anciennement wasiqr
    code = require('./pair');

require('events').EventEmitter.defaultMaxListeners = 500;

// Routes personnalisées
app.use('/kayaqr', server); // renommé
app.use('/code', code);
app.use('/pair', async (req, res, next) => {
    res.sendFile(__path + '/pair.html')
});
app.use('/', async (req, res, next) => {
    res.sendFile(__path + '/index.html') // renommé
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`
██████╗  █████╗ ██╗   ██╗ █████╗     ███╗   ███╗██████╗ 
██╔══██╗██╔══██╗╚██╗ ██╔╝██╔══██╗    ████╗ ████║╚════██╗
██████╔╝███████║ ╚████╔╝ ███████║    ██╔████╔██║ █████╔╝
██╔═══╝ ██╔══██║  ╚██╔╝  ██╔══██║    ██║╚██╔╝██║ ╚═══██╗
██║     ██║  ██║   ██║   ██║  ██║    ██║ ╚═╝ ██║██████╔╝
╚═╝     ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝    ╚═╝     ╚═╝╚═════╝ 

>> KAYA MD server running on http://localhost:${PORT}
>> Powered by Kaya Dev
>> Join our WhatsApp channel for updates!
    `);
});

module.exports = app;

/**
    powered by Kaya Dev Team 
    join our WhatsApp channel for more updates 
**/