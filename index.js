import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("index.ejs",{ content: "API Response Example." });
});

app.get("/rnd", async (req, res) => {
  try {
    const result = await axios.get("https://v2.jokeapi.dev/joke/Christmas");
    res.render("index.ejs", { content: result.data});
  } catch (error) {
    res.status(404).send(error.message);
  }
});
app.post("/go", async (req,res)=>{
  try {
    var catagory = req.body["category"];
    var flags = req.body["flags"];
    const result = await axios.get(`https://v2.jokeapi.dev/joke/${catagory}${flags}`);
    res.render("index.ejs",{content: result.data});
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
