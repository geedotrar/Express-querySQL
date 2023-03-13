import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const port = process.env.PORT || 3003;

app.listen(port, () => console.log(`Server listening on port ${port}`));

// app.listen(3100, () => {
//     console.log("Server running in port 3100");
//   });
