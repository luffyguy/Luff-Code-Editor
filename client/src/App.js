import './App.css';
import React, { useState } from "react";
import axios from "axios";

function App() {

  const [code, setCode] = useState(" ");
  const [output, setOutput] = useState();

  const handleSubmit = async () => {

    const payload = {
      language: "cpp",
      code
    }
    try {
      const { data } = await axios.post("http://localhost:8000/run", payload)
      /* const { data } = await axios.post("https://luff-code.herokuapp.com/run", payload) */
      console.log(data.output.stdout);
      setOutput(data.output.stdout);
    }
    catch (err) {
      setOutput(err.response.data.err.stderr);
      console.log(err.response.data.err.stderr);
    }
  }
  return (
    <div className="App">
      <h1>Online code compiler</h1>
      <textarea cols="75" rows="20" value={code} onChange={(e)=>setCode(e.target.value)}></textarea>
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <p>{output}</p>
    </div>
  );
}

export default App;
