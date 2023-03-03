import express, { json } from 'express';
import fileUpload from 'express-fileupload';
import fs from 'fs';
import path from 'path';

// import renderShirt from './components/renderShirt.js';
// import renderPants from './components/renderPants.js';

import Render from './components/experimentalclass.js';

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

let currentShirtFileID = 10;
let shirtIDToDelete = 0;
app.post('/renderShirt', fileUpload(), async (req, resp) => {
    currentShirtFileID++;
    shirtIDToDelete++;
    // await renderShirt(req, resp);
    const receivedFiles = req.files?.shirtTexture;
    let render = new Render('Shirts', receivedFiles, req, resp, currentShirtFileID, shirtIDToDelete);
    render.start();
});

let currentPantsFileID = 10;
let pantsIDToDelete = 0;
app.post('/renderPants', fileUpload(), async (req, resp) => {
    currentPantsFileID++;
    pantsIDToDelete++;
    // await renderPants(req, resp);
    const receivedFiles = req.files?.pantsTexture;
    let render = new Render('Pants', receivedFiles, req, resp, currentPantsFileID, pantsIDToDelete);
    render.start();
});

app.listen(7000, () => {
    console.log('app working - based');
});