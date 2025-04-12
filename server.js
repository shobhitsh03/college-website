import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

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



// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});


//added for db connection
import mongoose from "mongoose";
import cors from "cors";
app.use(cors({
  origin: "*",
  origin: "http://localhost:3000", // Allow all origins (use specific origins in production)
}));
import dotenv from "dotenv";
dotenv.config();


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL, {
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));
const formDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define the FormData model
const FormData = mongoose.model("FormData", formDataSchema);


// Route to save form data
app.post("/submit", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validate incoming data
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const data = new FormData({ name, email, phone, message });
    await data.save();
    res.status(201).json({ message: "Data saved successfully!" });
  } catch (error) {
    console.error("❌ Error saving data:", error);
    res.status(500).json({ message: "Failed to save data." });
  }
});

//route to see the database collections
app.get("/records", async (req, res) => {
  try {
    const records = await FormData.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch records." });
  }
});