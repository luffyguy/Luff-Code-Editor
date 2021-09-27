import express from "express";

import { generateFile } from "./generateFile.js";
import { executeCpp } from "./executeCpp.js";

const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
    return res.json({ success: true });
})

app.post("/run", async (req, res) => {
    
    const { language = "cpp", code } = req.body;

    if (code === undefined) {
        return res.status(400).json({ success: false, error: "Empty code body" })
    }
    
    try {
        const filepath = await generateFile(language, code);

        const output = await executeCpp(filepath);
    
        return res.send({ filepath, output });
    } catch (err) {
        res.status(400).json({ err });
    }
})

app.listen(port, ()=>console.log(`running on port - ${port}`))