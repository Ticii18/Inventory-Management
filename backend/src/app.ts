import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import equipRouter from "./routes/equipmentRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/equip", equipRouter)

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ message: "FORMOTEX API funcionando correctamente", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);

});

  // console.log(`📱 Endpoints disponibles:`);
  // console.log(`   - POST /api/auth/login`);
  // console.log(`   - POST /api/auth/register`);
  // console.log(`   - GET  /api/users`);
  // console.log(`   - POST /api/users`);
  // console.log(`   - GET  /api/users/:id`);
  // console.log(`   - DELETE /api/users/:id`);