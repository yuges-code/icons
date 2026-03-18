import 'dotenv/config';

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


const data = response.headers;
console.log(data);

// console.log(data?.document?.children)

// https://habr.com/ru/companies/joom/articles/708286/
