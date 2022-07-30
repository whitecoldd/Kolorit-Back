const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const itemsRoute = require("./routes/items");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const catRoute = require("./routes/categories");
const contactRoute = require("./routes/contacts");
const sliderRoute = require("./routes/slider");
const aboutRoute = require("./routes/about");
const articlesRoute = require("./routes/articles");
const brandRoute = require("./routes/brand");
dotenv.config();
mongoose
  .connect(process.env.MONGODB_URI || process.env.MONGO_URL)
  .then(() => console.log("Connection Successful"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/cat", catRoute);
app.use("/api/slider", sliderRoute);
app.use("/api/user", userRoute);
app.use("/api/items", itemsRoute);
app.use("/api/cart", cartRoute);
app.use("/api/contact", contactRoute);
app.use("/api/order", orderRoute);
app.use("/api/about", aboutRoute);
app.use("/api/article", articlesRoute);
app.use("/api/brand", brandRoute);

// app.use(express.static(__dirname))
// app.use(express.static(path.resolve(__dirname, 'build')))

// app.get('*', (req, res) =>{
//     res.sendFile(path.join(__dirname, 'build', 'index.html'))
// })
if (process.env.NODE_ENV === "production") {
  app.use(express.static("Kolorit-Front/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "Kolorit-Front", "build", "index.html"));
  });
}

app.listen(process.env.PORT || 1010, () => {
  console.log("backend server is up on PORT" + process.env.PORT);
});
