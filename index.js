const express = require("express");
const app = express();
const port = 7304;
const anggotaRouter = require("./router/anggota.js");
const penerbitRouter = require("./router/penerbit.js");
const penulisRouter = require("./router/penulis.js");
const kategoriBukuRouter = require("./router/kategoriBuku.js");
const bukuRouter = require("./router/buku.js");
const peminjamanRouter = require("./router/peminjaman.js");
const riwayatPeminjamanRouter = require("./router/riwayatPeminjaman.js");

// import body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("EXPRESS MID 🔥");
});

// route anggota
app.use("/api/anggota", anggotaRouter);
app.use("/api/penerbit", penerbitRouter);
app.use("/api/penulis", penulisRouter);
app.use("/api/kategori", kategoriBukuRouter);
app.use("/api/buku", bukuRouter);
app.use("/api/peminjaman", peminjamanRouter);
app.use("/api/riwayat", riwayatPeminjamanRouter);

app.listen(port, () => {
  console.log(`Aplikasi sedang berjalan pada port: ${port}`);
});
