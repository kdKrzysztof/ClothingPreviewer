import express, { json } from 'express';
import fileUpload from 'express-fileupload';
import fs from 'fs';
import path from 'path';

import renderShirt from './components/renderShirt.js';
import renderPants from './components/renderPants.js';

const parentFolder = path.resolve(path.dirname(''));
const publicFolder = `${parentFolder}\\public`; //basically select the public folder directory - it holds rendered data
const shirtsFolder = `${publicFolder}\\shirts`;
const pantsFolder = `${publicFolder}\\pants`;

fs.readdirSync(shirtsFolder).forEach(file => {
    fs.rmSync(`${shirtsFolder}\\${file}`);
});

fs.readdirSync(pantsFolder).forEach(file => {
    fs.rmSync(`${pantsFolder}\\${file}`);
});

const app = express();

app.use(json());
app.use('/shirts', express.static('public/shirts'));  // these are backend folders that hold data like renders, assets, sent data etc. Don't change them unless you know how to.
app.use('/pants', express.static('public/pants'));
app.use('/error', express.static('errors'));


app.post('/renderShirt', fileUpload(), async (req, resp) => {
    await renderShirt(req, resp);
});

app.post('/renderPants', fileUpload(), async (req, resp) => {
    await renderPants(req, resp);
});

app.listen(7000, () => {
    console.log('app working - based');
});