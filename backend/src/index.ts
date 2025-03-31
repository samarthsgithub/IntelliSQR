import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes"

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());
app.use("/api/users",userRoutes);

const PORT = process.env.PORT||5001;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})