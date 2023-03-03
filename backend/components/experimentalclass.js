import { promisify } from 'util';
import fs from 'fs';
import { exec } from 'child_process';
import path from 'path';
import 'dotenv/config';
const execAsync = promisify(exec);

class render {
    constructor(type, receivedFile) {
        this.type = type;
        this.receivedFile = receivedFile;
    }

    static async method(req, resp){
        const parentFolder = path.resolve(path.dirname(''));
        const blenderModelDirectory = `${parentFolder}\\blenderFiles\\project.blend`;
        const pythonDirectory_RenderScript = `${parentFolder}\\${'render' + this.type + '.py'}`;
        const renderFolder = `${parentFolder}\\public\\${this.type + 's'}`;

        // eslint-disable-next-line no-undef
        const host = process.env.HOST;
    
        if (this.receivedFiles?.data == null) {
            resp.status(400).json(`${host}/error/notexture.png`);
            return;
        }
    
        if (this.receivedFiles?.mimetype !== 'image/jpeg' && this.receivedFiles?.mimetype !== 'image/png' ) {
            resp.status(400).json(`${host}/error/noimage.png`);
            return;
        }
    
        fs.writeFile(`./receivedFiles/${this.type}ToRender.png`, this.receivedFiles.data, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('file written successfully');
            }
        });
        
        try {
            await execAsync(`blender -b ${blenderModelDirectory} --python ${pythonDirectory_RenderScript} -o "${renderFolder}\\${currentShirtFileID}#" -F PNG -f 1`);
        } catch(err) {
            console.log(err);
        }
        
        resp.status(200).json(`${host}/${this.type + 's'}/${currentShirtFileID}1.png`);
    
        try {
            fs.rmSync(`${renderFolder}\\${shirtIDToDelete}1.png`);
        } catch (err) {
            return;
        }
    }
}

export default render;