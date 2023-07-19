import express from "express";
import cors from "cors";
import router from "./routes/route.js";
import mongoose from "mongoose";

const app = express();
const port = 3000;
const corsOptions = {
  origin: "*",
};
// connect database
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://127.0.0.1:27017/perusahaan", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Berhasil terhubung ke database");
  })
  .catch((err) => {
    console.log("Tidak bisa terhubung ke database", err);
    process.exit();
  });
// konfigurasi cors
app.use(cors(corsOptions));

// parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route untuk API
app.use(router);

// menjalankan server
app.listen(port, () => {
  console.log(`Server app listening on port ${port}`);
});
