const express = require("express");
const app = express();
require("dotenv").config();
require("./Db/conn");
const cookieparser =require("cookie-parser"); 
const DefaultData = require("./defaultdata");
const cors = require("cors");
const product = require("./router/product");
const user = require("./router/user");
app.use(express.json());
app.use(cors());
app.use(cookieparser(""));

app.use(product);
app.use(user);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server listening  on ${PORT}`);
});

DefaultData();
