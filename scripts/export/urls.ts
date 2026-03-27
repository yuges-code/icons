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

if (! fs.existsSync(path.resolve(__dirname, '../../cache/file.json'))) {
    console.log('File not found');

    process.exit(1);
}

const data = fs.readFileSync(path.resolve(__dirname, '../../cache/file.json'), 'utf8');

const file = JSON.parse(data);
const { document } = file;

if (!document || document.type != 'DOCUMENT') {
    throw new Error('Document not found in the file');
}

const canvases = document?.children?.filter((canvas: any) => canvas.type === 'CANVAS');

if (!canvases || !canvases?.length) {
    throw new Error('Canvases not found in the file');
}

const sets = canvases[0].children
    .filter((set: any) => set.type === 'COMPONENT_SET');

const ids = [...new Set([].concat(
    ...sets?.map(
        (set: any) => set?.children?.filter(
            (conponent: any) => conponent?.id && conponent?.type === 'COMPONENT'
        )?.map(
            (conponent: any) => conponent?.id
        )
    )
))];

if (!ids || !ids?.length) {
    throw new Error('No images found in the file');
}

const params = new URLSearchParams({
    ids: ids.join(','),
    format: 'svg',
}).toString();

const response = await fetch(
    `${FIGMA_API_HOST}/images/${FIGMA_FILE_KEY}?${params}`,
    {
        headers: { 'X-FIGMA-TOKEN': FIGMA_TOKEN }
    }
).catch((error) => {
    console.log(error);

    process.exit(1);
});

const urls = await response.text();

fs.writeFileSync(path.resolve(__dirname, '../../cache/urls.json'), urls);
fs.writeFileSync(path.resolve(__dirname, '../../cache/headers.json'), JSON.stringify(response.headers));
