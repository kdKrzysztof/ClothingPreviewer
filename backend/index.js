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

setInterval(() => {
    fs.readdirSync(shirtsFolder).forEach(file => {
        fs.rmSync(`${shirtsFolder}\\${file}`);
    });
    
    fs.readdirSync(pantsFolder).forEach(file => {
        fs.rmSync(`${pantsFolder}\\${file}`);
    });
}, 3600000);

const app = express();

app.use(json());
app.use('/shirts', express.static('public/shirts'));  // these are backend folders that hold data like renders, assets, sent data etc. Don't change them unless you know how to.
app.use('/pants', express.static('public/pants'));
app.use('/error', express.static('errors'));


app.post('/renderShirt', fileUpload(), async (req, resp) => {
    const receivedFiles = req.files?.shirtTexture;

    if (receivedFiles?.data == null) {
        resp.status(400).json(`${process.env.HOST}/error/notexture.png`);
        return;
    }

    if (receivedFiles?.mimetype !== 'image/jpeg' && receivedFiles?.mimetype !== 'image/png' ) {
        resp.status(400).json(`${process.env.HOST}/error/noimage.png`);
        return;
    }

    let render = new Render;
    let result = await render.renderShirt(receivedFiles);
    resp.status(200).json(result);
});


app.post('/renderPants', fileUpload(), async (req, resp) => {
    const receivedFiles = req.files?.pantsTexture;

    if (receivedFiles?.data == null) {
        resp.status(400).json(`${process.env.HOST}/error/notexture.png`);
        return;
    }

    if (receivedFiles?.mimetype !== 'image/jpeg' && receivedFiles?.mimetype !== 'image/png' ) {
        resp.status(400).json(`${process.env.HOST}/error/noimage.png`);
        return;
    }

    let render = new Render;
    let result = await render.renderPants(receivedFiles);

    resp.status(200).json(result);
});

app.listen(7000, () => {
    console.log('app working - based');
});