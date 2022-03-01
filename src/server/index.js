const express = require('express');
const axios = require('axios');
const zlib = require('zlib');
const convert = require('xml-js');

const app = express();

const testdata = { items: [{ name: 'TESTITEM' }] };

function getPastebinData(url) {
  return axios.get(url).then(res => res.data);
}

function parsePastebin(data) {
  return zlib.inflateSync(
    Buffer.from(
      data.replace('-', '+').replace('_', '/'), 'base64'
    )
  );
}

async function parseContent(data) {
  // https://pastebin.com/WhWjXGga
  // https://pastebin.com/raw/WhWjXGga
  console.log(data);
  if (data.startsWith('https://pastebin.com')) {
    const url = 'https://pastebin.com/raw/'.concat(data.split('/').at(-1));
    const content = await getPastebinData(url);
    const parsedContent = JSON.parse(convert.xml2json(parsePastebin(content), { compact: true }));
    return { parsed: parsedContent };
  }
  return { result: 'no result' };
}

app.use(express.static('dist'));
app.get('/api/parseTest', (req, res) => res.send(testdata));
app.get('/api/parse', async (req, res) => {
  res.send(await parseContent(req.query.paste));
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
