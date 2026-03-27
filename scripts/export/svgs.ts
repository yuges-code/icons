import fs from 'fs';
import url from 'url';
import 'dotenv/config';
import path from 'path';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const paths = {
    file: path.resolve(__dirname, '../../cache/file.json'),
    urls: path.resolve(__dirname, '../../cache/urls.json'),
};

const variants = ['dynamic', 'regular'];

Object.entries(paths).forEach(([key, value]) => {
    if (! fs.existsSync(value)) {
        console.log(`${key[0].toUpperCase() + key.slice(1)} not found`);

        process.exit(1);
    }
});

const { images } = JSON.parse(fs.readFileSync(paths.urls, 'utf8'));
const { document } = JSON.parse(fs.readFileSync(paths.file, 'utf8'));

if (!document || document.type != 'DOCUMENT') {
    throw new Error('Document not found in the file');
}

const canvases = document?.children?.filter((canvas: any) => canvas.type === 'CANVAS');

if (!canvases || !Array.isArray(canvases) || !canvases?.length) {
    throw new Error('Canvases not found in the file');
}

const sets = [
    ...[].concat(
        ...canvases.map(
            canvas => canvas?.children?.filter(
                (set: any) => set?.type === 'COMPONENT_SET'
            )
        )
    )
];

if (!sets || !sets.length) {
    process.exit(1);
}

fs.rmSync(
    path.resolve(__dirname, '../../icons'),
    {
        force: true,
        recursive: true,
    }
);
fs.mkdirSync(path.resolve(__dirname, '../../icons'), { recursive: true });

await sets.forEach(async(set: any) => {
    const property = set?.componentPropertyDefinitions?.Weight;

    if (property.type != 'VARIANT') {
        return;
    }

    await set?.children?.forEach(async (component: any) => {
        if (component.type != 'COMPONENT') {
            return;
        }

        let [param, variant] = component.name.split('=').map((item: string) => item.toLowerCase());

        if (param != 'weight' && !variants.includes(variant)) {
            return;
        }

        fs.mkdirSync(path.resolve(__dirname, `../../icons/${variant}`), { recursive: true });

        const address = images?.[component.id];

        if (! address) {
            return;
        }

        const response = await fetch(address).catch((error) => {
            console.log(error);

            process.exit(1);
        });

        const svg = await response.text();

        fs.writeFileSync(path.resolve(__dirname, `../../icons/${variant}/${set.name}.svg`), svg);
    });
});
