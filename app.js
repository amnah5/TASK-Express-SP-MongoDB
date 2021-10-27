const express = require("express");
const productRoutes = require("./apis/products/routes");
const connectDB = require("./db/database");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.originalUrl}`);
  console.log(`${req.method}`);
  next();
});
app.use("/api/products", productRoutes);
connectDB();

app.use((req, res, next) => {
  const err = new Error("not found");
  res.status(404).json({ message: err.message });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});
const PORT = 8000;
app.listen(PORT, () => console.log(`Application running on localhost:${PORT}`));
