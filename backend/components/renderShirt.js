import { promisify } from 'util';
import fs from 'fs';
import { exec } from 'child_process';
import path from 'path';
import 'dotenv/config';

const execAsync = promisify(exec);

// eslint-disable-next-line no-undef
const host = process.env.HOST;

const parentFolder = path.resolve(path.dirname(''));
const blenderModelDirectory = `${parentFolder}\\blenderFiles\\project.blend`;
const pythonDirectory_ShirtRender = `${parentFolder}\\renderShirt.py`;
const shirtsFolder = `${parentFolder}\\public\\shirts`;

let currentShirtFileID = 10;
let shirtIDToDelete = 0;

const renderShirt = async (req, resp) => {
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

    fs.writeFile('./receivedFiles/shirtToRender.png', receivedFiles.data, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('file written successfully');
        }
    });
    
    try {
        await execAsync(`blender -b ${blenderModelDirectory} --python ${pythonDirectory_ShirtRender} -o "${shirtsFolder}\\${currentShirtFileID}#" -F PNG -f 1`);
    } catch(err) {
        console.log(err);
    }
    
    resp.status(200).json(`${host}/shirts/${currentShirtFileID}1.png`);

    try {
        fs.rmSync(`${shirtsFolder}\\${shirtIDToDelete}1.png`);
    } catch (err) {
        return;
    }
};

export default renderShirt;