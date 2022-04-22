//================ Imports =====================
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
var multer = require("multer");
var upload = multer();
//================ Simple logic =====================
dotenv.config();
mongoose.Promise = global.Promise; //Set mongoose as a global so be viewed everywhere
//================ Directories Import =====================
const dbConfig = require("./config/db");
const ErrorHandler = require("./middleware/ErrorHandler");
const fileUpload = require("express-fileupload");
//================ Routes Imports =====================
const userRoutes = require(`./routes/User`);
const cartRoutes = require(`./routes/Cart`);
const favoriteRoutes = require(`./routes/Favorite`);
const bannersRoutes = require('./routes/Banner');
const eventsRoutes = require('./routes/Event');
const productRoutes = require('./routes/Product');
const categoryRoutes = require('./routes/Category');
const brandRoutes = require('./routes/Brand');
const faqRoutes = require('./routes/Faq');
const callusRoutes = require('./routes/CallUs');
const whoUsRoutes = require('./routes/WhoUs');
const supportRoutes = require('./routes/SupportRoutes');
//================ Middlewares Use =====================
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/favorite", favoriteRoutes);
app.use('/api/banners', bannersRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/product', productRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/brand', brandRoutes);
app.use('/api/faq', faqRoutes);
app.use('/api/call', callusRoutes);
app.use('/api/who', whoUsRoutes);
app.use('/api/problem', supportRoutes);
app.use(ErrorHandler);
//================ Global Exception  =====================
process.on("uncaughtException", (exception) => {
  console.log("uncaughtException");
  process.exit(1);
});
process.on("unhandledRejection", (exception) => {
  console.log("Promise Reject");
  process.exit(1);
});
//================ Database Connection  =====================
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database Connected Sucessfuly");
    },
    (error) => {
      console.log(`Database can't be connect: ${error}`);
    }
  );

//================ Server listen  =====================
app.listen(process.env["PORT"] || 4000, () => console.log("Server is working"));
