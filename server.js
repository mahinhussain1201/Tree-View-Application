const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connectDb");
const godownRoutes = require("./routes/godownRoutes");
const itemRoutes = require("./routes/itemRoutes");
const morgan=require('morgan');
const dotenv=require('dotenv');

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
connectDB();

// Routes
app.use("/api/v1/godowns", require('./routes/godownRoutes'));
app.use("/api/v1/items", require('./routes/itemRoutes'));
app.use("/api/users", require('./routes/userRoutes'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
