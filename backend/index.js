import express from "express"

import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectDb } from "./db.js";
// app.js or server.js
import cartRoutes from './routes/cartRoute.js';


import authRoutes from './routes/userRoutes.js';
import marketplaceRoutes from './routes/productRoute.js'
dotenv.config();
const app = express();
connectDb()
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  res.set('Surrogate-Control', 'no-store');
  next();
});


app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(morgan("dev"));



// Routes
app.get("/", (req, res) => {
  res.send("digitec backend is listening on port....");
});



app.use('/api/auth', authRoutes);
app.use('/api/marketplace', marketplaceRoutes);



app.use('/api/cart', cartRoutes);







const port = process.env.PORT || 1080;

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);

})








