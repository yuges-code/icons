import fs from 'fs';
import url from 'url';
import 'dotenv/config';
import path from 'path';
import type { Icon } from "../../src/types/Icon";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const icons = [] as Icon[];
const paths = {
    file: path.resolve(__dirname, '../../cache/file.json'),
};

Object.entries(paths).forEach(([key, value]) => {
    if (! fs.existsSync(value)) {
        console.log(`${key[0].toUpperCase() + key.slice(1)} not found`);

        process.exit(1);
    }
});

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

sets.forEach((set: any) => {
    icons.push({
        name: {
            kebab: set.name.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, '-').toLowerCase(),
            pascal: set.name.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
                .map((x: any) => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
                .join(''),
        }
    })
});

const template =
`import { Icon } from "./Icon";

export const Icons = (<const>${JSON.stringify(icons, null, 4)}) satisfies readonly Icon[];

export type Icons = (typeof Icons)[number];
`;

fs.writeFileSync(path.resolve(__dirname, `../../src/types/Icons.ts`), template);
