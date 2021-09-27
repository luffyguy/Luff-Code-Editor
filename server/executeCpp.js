import { exec } from "child_process";
import fs from "fs";
import path from "path";

const __dirname = path.resolve();
const outputPath = path.join(__dirname, "output");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

export const executeCpp = (filepath) => {

    const jobId = path.basename(filepath).split(".")[0]; //extract filename from path
    const outPath = path.join(outputPath, `${jobId}.out`);

    return new Promise(( resolve, reject ) => {
        exec(`g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out`, 
            (error, stdout, stderr) => {
                error && reject({ error, stderr });
                stderr && reject({ stderr });
                resolve({ stdout });
            }
        ) //execute code
    })
}