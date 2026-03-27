import fs from 'fs';
import url from 'url';
import 'dotenv/config';
import path from 'path';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const {
    FIGMA_TOKEN,
    FIGMA_API_HOST,
    FIGMA_FILE_KEY
} = process.env;

if (! FIGMA_TOKEN) {
    console.log('The figma api token is missing');

    process.exit(1);
}

const response = await fetch(
    `${FIGMA_API_HOST}/files/${FIGMA_FILE_KEY}`,
    {
        headers: { 'X-FIGMA-TOKEN': FIGMA_TOKEN }
    }
).catch((error) => {
    console.log(error);

    process.exit(1);
});

const file = await response.text();

fs.writeFileSync(path.resolve(__dirname, '../../cache/file.json'), file);
fs.writeFileSync(path.resolve(__dirname, '../../cache/headers.json'), JSON.stringify(response.headers));
