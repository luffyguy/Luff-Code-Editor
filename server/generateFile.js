import fs from "fs";
import path from "path"
import {v4 as uuid} from "uuid";

const __dirname = path.resolve();
const dirCodes = path.join(__dirname, "codes");

if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recusive: true });
}

export const generateFile = async (format, content) => {
    const jobId = uuid(); //unique name
    const filename = `${jobId}.${format}`; 
    const filepath = path.join(dirCodes, filename);
    await fs.writeFileSync(filepath, content); //write code in file
    return filepath;
}