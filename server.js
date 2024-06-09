const mongoose = require("mongoose");
const next = require("next");
const dotenv = require("dotenv");

const dev = process.env.NODE_ENV != "production";
const nextServer = next({ dev });
const handle = nextServer.getRequestHandler();

dotenv.config({ path: "./config.env" });
const app = require("./app");

// BUILDING CONNECTION WITH DATABASE

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
const connectDB = async () => {
  await mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .catch(function (error) {
      console.log(`Unable to connect to the Mongo db  ${error} `);
    });
  //...rest of code
};

// use as a function
connectDB();

const port = 3000;

nextServer.prepare().then(() => {
  app.get("*", (req, res) => {
    return handle(req, res);
  });
  app.listen(port, () => {
    console.log(`App Running on port ${port}.....`);
  });
});
