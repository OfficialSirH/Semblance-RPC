import { Client } from 'discord-rpc';
import 'dotenv/config';

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const PORT = process.env.PORT || 3000;

const scopes = ['rpc'];
const startTimestamp = Date.now();
const redirectUri = `http://localhost:${PORT}/api/authorize`;
const client = new Client({ transport: 'ipc' });

client.on('ready', () => {
    console.info('Logged in as', client.application.name);
    console.info('Authed for user', client.user.username);

    try {
        setActivity();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
});

async function setActivity() {
    await client.setActivity({
        largeImageKey: 'semblancebeta',
        largeImageText: "The all powerful Semblance!",
        details: 'Official C2S Bot!',
        buttons: [
            { label: 'Click to invite Semblance!', url: 'http://bit.ly/SemblanceBot' },
            { label: 'Support me here!', url: 'https://www.patreon.com/SirHDeveloper' }
        ],
        startTimestamp,
    });
    console.info('started!');
}

// Log in to RPC with client id
client.login({ clientId, clientSecret, scopes, redirectUri }).catch(console.error);