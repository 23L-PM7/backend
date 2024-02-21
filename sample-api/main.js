const express = require("express");
const fs = require("fs");
var cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/tasks", (req, res) => {
  const data = fs.readFileSync("tasks.json", "utf8");
  res.json(JSON.parse(data));
});

app.post("/tasks/create", (req, res) => {
  const { title } = req.body;

  const data = fs.readFileSync("tasks.json", "utf8");
  const list = JSON.parse(data);

  const taskId = Date.now();

  list.push({
    id: taskId,
    title: title,
  });

  fs.writeFileSync("tasks.json", JSON.stringify(list));
  res.json([{ status: "Success" }]);
});

app.put("/tasks/update/:id", (req, res) => {
  const id = req.params.id;
  // TODO

  res.json([{ status: "Success" }]);
});

app.delete("/tasks/delete/:id", (req, res) => {
  const { id } = req.params;

  const data = fs.readFileSync("tasks.json", "utf8");
  const list = JSON.parse(data);

  const newList = list.filter((item) => item.id !== Number(id));

  fs.writeFileSync("tasks.json", JSON.stringify(newList));

  res.json([{ status: "Success" }]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
