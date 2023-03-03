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
const pythonDirectory_PantsRender = `${parentFolder}\\renderPants.py`;
const pantsFolder = `${parentFolder}\\public\\pants`;

let currentPantsFileID = 10;
let pantsIDToDelete = 0;

const renderPants = async (req, resp) => {
    currentPantsFileID++;
    pantsIDToDelete++;

    const receivedFiles = req.files?.pantsTexture;
    
    if (receivedFiles?.data == null) {
        resp.status(400).json(`${host}/error/notexture.png`);
        return;
    }

    if (receivedFiles?.mimetype !== 'image/jpeg' && receivedFiles?.mimetype !== 'image/png' ) {
        resp.status(400).json(`${host}/error/noimage.png`);
        return;
    }
    
    fs.writeFile('./receivedFiles/pantsToRender.png', receivedFiles.data, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('file written successfully');
        }
    });

    try {
        await execAsync(`blender -b ${blenderModelDirectory} --python ${pythonDirectory_PantsRender} -o "${pantsFolder}\\${currentPantsFileID}#" -F PNG -f 1`);
    } catch(err) {
        console.log(err);
    }
    
    console.log('Pants render created');
    resp.status(200).json(`${host}/pants/${currentPantsFileID}1.png`);

    try {
        fs.rmSync(`${pantsFolder}\\${pantsIDToDelete}1.png`);
    } catch (err) {
        return;
    }
};

export default renderPants;