import express, { json } from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import fs from 'fs';
import { promisify } from 'util';
import { exec } from 'child_process';
import path from 'path';

const parentFolder = path.resolve(path.dirname(''));
const blenderModelDirectory = `${parentFolder}\\blenderFiles\\project.blend`; // avatar model blend file
const pythonDirectory_ShirtRender = `${parentFolder}\\renderShirt.py`; // shirt render script directory
const pythonDirectory_PantsRender = `${parentFolder}\\renderPants.py`; // pants render script directory
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
const execAsync = promisify(exec);

let currentShirtFileID = 10;
let shirtIDToDelete = 0;
let currentPantsFileID = 10;
let pantsIDToDelete = 0;


app.use(json());
app.use(cors());
app.use('/shirts', express.static('public/shirts'));  // these are backend folders that hold data like renders, assets, sent data etc. Don't change them unless you know how to.
app.use('/pants', express.static('public/pants'));
app.use('/error', express.static('errors'));

const host = 'http://localhost:7000'; // idk how bv hosting works, this is a variable to my localhost

app.post('/renderShirt', fileUpload(), async (req, resp) => {
   
    currentShirtFileID++;
    shirtIDToDelete++;

    const receivedFiles = req.files?.shirtTexture;
    
    if (receivedFiles?.data == null) {
        resp.status(400).json(`${host}/error/notexture.png`);
        return;
    }

    if (receivedFiles?.mimetype !== 'image/jpeg' && receivedFiles?.mimetype !== 'image/png' ) {
        resp.status(400).json(`${host}/error/noimage.png`);
        return;
    }
    console.log(receivedFiles);
    fs.writeFile('./receivedFiles/shirtToRender.png', receivedFiles.data, (err) => { // im concerned if this will work on higher scale. We'll see lol
        if (err) {
            console.log(err);
        } else {
            console.log('file written successfully');
        }
    });
    
    try {
        await execAsync(`blender -b ${blenderModelDirectory} --python ${pythonDirectory_ShirtRender} -o "${shirtsFolder}\\${currentShirtFileID}#" -F PNG -f 1`);
        console.log(`blender directory: ${blenderModelDirectory}`);
        console.log(`python directory: ${pythonDirectory_ShirtRender}`);
        console.log(`shirt directory: ${shirtsFolder}`);
        console.log(`Shirt ${currentShirtFileID}`);
    } catch(err) {
        console.log(err);
    }
    
    resp.status(200).json(`${host}/shirts/${currentShirtFileID}1.png`);

    try {
        fs.rmSync(`${shirtsFolder}\\${shirtIDToDelete}1.png`);
    } catch (err) {
        return;
    }
});

app.post('/renderPants', fileUpload(), async (req, resp) => {
    currentPantsFileID++;
    pantsIDToDelete++;

    const receivedFiles = req.files?.pantsTexture;
    console.log(req.files);
    
    if (receivedFiles?.data == null) {
        resp.status(400).json(`${host}/error/notexture.png`);
        return;
    }

    if (receivedFiles?.mimetype !== 'image/jpeg' && receivedFiles?.mimetype !== 'image/png' ) {
        resp.status(400).json(`${host}/error/noimage.png`);
        return;
    }
    
    fs.writeFile('./receivedFiles/pantsToRender.png', receivedFiles.data, (err) => {
        console.log(err);
    });

    await execAsync(`blender -b ${blenderModelDirectory} --python ${pythonDirectory_PantsRender} -o "${pantsFolder}\\${currentPantsFileID}#" -F PNG -f 1`);
    
    console.log('Pants render created');
    resp.status(200).json(`${host}/pants/${currentPantsFileID}1.png`);

    try {
        fs.rmSync(`${pantsFolder}\\${pantsIDToDelete}1.png`);
    } catch (err) {
        return;
    }
});

app.listen(7000, () => {
    console.log('app working - based');
});