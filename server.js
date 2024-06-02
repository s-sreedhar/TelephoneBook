const express = require('express');
const connectDb=require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');

const PORT = process.env.PORT || 3002;
const dotenv=require("dotenv").config();


connectDb();
const app = express();
app.use(express.json());
app.use("/api/contacts",require("./routes/contactRoutes"));
app.use("/api/users",require("./routes/userRoutes"));
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
