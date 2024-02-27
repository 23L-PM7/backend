const express = require("express");
const fs = require("fs");
var cors = require("cors");
const postgres = require("postgres");
require("dotenv").config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: "require",
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/tasks", async (req, res) => {
  const result = await sql`select * from tasks`;
  res.json(result);
});

app.post("/tasks/create", async (req, res) => {
  const { title } = req.body;
  await sql`insert into tasks(id, title) values(${Date.now()}, ${title})`;
  res.json([{ status: "Success" }]);
});

app.put("/tasks/update/:id", async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  await sql`update tasks set title = ${title} where id = ${id}`;
  res.json([{ status: "Success" }]);
});

app.delete("/tasks/delete/:id", async (req, res) => {
  const { id } = req.params;
  await sql`delete from tasks where id = ${id}`;
  res.json([{ status: "Success" }]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
