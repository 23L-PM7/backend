const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/articles", (req, res) => {
  const data = fs.readFileSync("articles.json", "utf8");
  res.json(JSON.parse(data));
});

app.post("/articles/create", (req, res) => {
  const { title, desc } = req.body;

  const data = fs.readFileSync("articles.json", "utf8");
  const list = JSON.parse(data);

  list.push({
    title: title,
    desc: desc,
  });
  fs.writeFileSync("articles.json", JSON.stringify(list));
  res.json([{ status: "Success" }]);
});

app.get("/articles/update", (req, res) => {
  // TODO
});

app.get("/articles/delete", (req, res) => {
  // TODO
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
