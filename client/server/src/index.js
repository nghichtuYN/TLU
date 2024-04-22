const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes");

const bodyParser = require("body-parser");
const cors=require('cors')
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(cors());

routes(app);
app.listen(PORT, () => {
  console.log(`server is running in port ${PORT}`);
});
