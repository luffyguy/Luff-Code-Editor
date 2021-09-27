import express from "express";
import cors from "cors";

import { generateFile } from "./generateFile.js";
import { executeCpp } from "./executeCpp.js";

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
    return res.json({ success: true });
})

app.post("/run", async (req, res) => {
    
    const { language = "cpp", code } = req.body;
    console.log(code)
    if (code === undefined) {
        return res.status(400).json({ success: false, error: "Empty code body" })
    }

    try {
        const filepath = await generateFile(language, code);
        console.log(filepath)
        const output = await executeCpp(filepath);
        console.log(output)
        return res.send({ filepath, output });
    } catch (err) {
        res.status(400).json({ err });
    }
    /* return res.send({ language, code}); */
})
app.listen(port, ()=>console.log(`running on port - ${port}`))