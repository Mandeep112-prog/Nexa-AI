// import { GoogleGenAI } from "@google/genai";
// import "dotenv/config";

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY
// });

// const response = await ai.models.generateContent({
//   model: "gemini-3.6-flash",
//   contents: "Difference between sql and mongodb"
// });

// console.log(response.text);

import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose, { connect } from "mongoose"
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connected successfully");
    } catch (err) {
        console.error("Database connection failed:", err);
        process.exit(1);
    }
};


const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    });
};

startServer();


// app.post("/api/chat", async (req, res) => {
//   try {
//     const { message } = req.body;

//     const response = await fetch(
//       "https://generativelanguage.googleapis.com/v1beta/interactions",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "x-goog-api-key": process.env.GEMINI_API_KEY,
//         },
//         body: JSON.stringify({
//           model: "gemini-3.6-flash",
//           input: message,
//         }),
//       }
//     );

//     const data = await response.json();
//     console.log(data.steps[1].content[0].text);
//     res.send(data);

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// });
