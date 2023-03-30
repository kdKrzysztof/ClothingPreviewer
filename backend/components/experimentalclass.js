import { promisify } from 'util';
import fs from 'fs';
import { exec } from 'child_process';
import path from 'path';
import 'dotenv/config';
const execAsync = promisify(exec);

let fileID = 10;

class Render {
    parentFolder = path.resolve(path.dirname(''));
    blenderFileDirectory = `${this.parentFolder}/blenderFiles/project.blend`;
    async _renderImage(blenderFile, texture, type){
        fileID++;
        const pythonDirectory_RenderScript = `${this.parentFolder}/${`render${type}.py`}`;
        const renderFolder = `${this.parentFolder}/public/${type}`;

        fs.writeFile(`./receivedFiles/${type}ToRender.png`, texture?.data, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('file written successfully');
            }
        });

        try {
            await execAsync(`blender -b ${blenderFile} --python ${pythonDirectory_RenderScript} -o "${renderFolder}\\${fileID}#" -F PNG -f 1`);
            const result = `${process.env.HOST}/${type}/${fileID}1.png`;
            return result;
        } catch(err) {
            console.log(err);
        }

    }

    async renderPants(texture){
        return this._renderImage(this.blenderFileDirectory, texture, 'Pants');
    }

    async renderShirt(texture){
        return this._renderImage(this.blenderFileDirectory, texture, 'Shirts');
    }
}

export default Render;