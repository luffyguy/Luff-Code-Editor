import express from "express"

const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    return res.json({ success: true });
})

app.post("/run", (req, res) => {
    
    const { language = "cpp", code } = req.body;

    if (code === undefined) {
        return res.status(400).json({success: false, error: "Empty code body"})
    }
    return res.send({language, code});
})

app.listen(port, ()=>console.log(`running on port - ${port}`))