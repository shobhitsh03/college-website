import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));

// Routes to HTML pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

app.get("/department", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "department.html"));
});

app.get("/research", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "research.html"));
});

app.get("/nss", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "nss.html"));
});

app.get("/ecell", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "ecell.html"));
});

app.get("/placement", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "placement.html"));
});

app.get("/admsn", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admsn.html"));
});

// 404 Handler
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});


