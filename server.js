import express from "express";
import dotenv from "dotenv";
import path from "path";
import expressLayouts from "express-ejs-layouts";

import { fileURLToPath } from "url";
import { title } from "process";
import { renderFile } from "ejs";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// Middleware to parse JSON bodies
app.use(express.json());
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(expressLayouts);
app.set("layout", "layout"); // views/layout.ejs

// Basic routes

const links = [
  { href: "/", text: "Home" },
  { href: "about", text: "About" },
  { href: "users", text: "Users" },
];
app.use((req, res, next) => {
  res.locals.links = links;
  next();
});
const users = ["Rose", "Cake", "Biff"];

app.get("/", (req, res) => {
  res.render("pages/home", {
    users: users,
    title: "Home",
  });
});
app.get("/about", (req, res) => {
  res.render("pages/about", {
    title: "About",
  });
});

app.get("/users", (req, res) => {
  res.render("pages/users", {
    title: "Users",
    users: users,
  });
});

app.post("/api/data", (req, res) => {
  const { name } = req.body;
  res.json({ message: `Hello, ${name}` });
});

// 404 handler
app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
