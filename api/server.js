const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connectDb");
const morgan=require('morgan');
const dotenv=require('dotenv');
const helmet=require('helmet');

const app = express();
dotenv.config();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
connectDB();

// Routes
app.use("/api/godowns", require('./routes/godownRoutes'));
app.use("/api/items", require('./routes/itemRoutes'));
app.use("/api/users", require('./routes/userRoutes'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
