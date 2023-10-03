const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connect = require("../config/db.js");

router.get("/", (req, res) => {
  connect.query(
    "SELECT b.id_buku,b.judul, b.tahun_terbit, k.nama_kategori as kategori, p.nama_penulis as penulis, t.nama_penerbit as penerbit FROM buku as b INNER JOIN kategori_buku as k ON b.id_kategori = k.id_kategori INNER JOIN penulis as p ON b.id_penulis = p.id_penulis INNER JOIN penerbit as t ON b.id_penerbit = t.id_penerbit",
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data buku",
          payload: rows,
        });
      }
    }
  );
});
router.post(
  "/",
  [
    body("judul").notEmpty(),
    body("tahun_terbit").notEmpty(),
    body("id_kategori").notEmpty(),
    body("id_penulis").notEmpty(),
    body("id_penerbit").notEmpty(),
  ],
  (req, res) => {
    const error = validationResult(req);

    // if validation failed
    if (!error.isEmpty()) {
      return res.status(422).json({
        error: error,
      });
    }

    let data = {
      judul: req.body.judul,
      tahun_terbit: req.body.tahun_terbit,
      id_kategori: req.body.id_kategori,
      id_penulis: req.body.id_penulis,
      id_penerbit: req.body.id_penerbit,
    };
    connect.query("INSERT INTO buku set ? ", data, (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
          error: err,
        });
      } else {
        return res.status(201).json({
          status: true,
          message: "Data buku berhasil ditambahkan",
          payload: data,
        });
      }
    });
  }
);
router.get("/(:id)", (req, res) => {
  let id = req.params.id;
  connect.query(
    "SELECT b.id_buku,b.judul, b.tahun_terbit, k.nama_kategori as kategori, p.nama_penulis as penulis, t.nama_penerbit as penerbit FROM buku as b INNER JOIN kategori_buku as k ON b.id_kategori = k.id_kategori INNER JOIN penulis as p ON b.id_penulis = p.id_penulis INNER JOIN penerbit as t ON b.id_penerbit = t.id_penerbit WHERE id_buku=?",
    id,
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data buku",
          payload: rows[0],
        });
      }
    }
  );
});
router.patch(
  "/(:id)",
  [
    body("judul").notEmpty(),
    body("tahun_terbit").notEmpty(),
    body("id_kategori").notEmpty(),
    body("id_penulis").notEmpty(),
    body("id_penerbit").notEmpty(),
  ],
  (req, res) => {
    const error = validationResult(req);

    // if validation failed
    if (!error.isEmpty()) {
      return res.status(422).json({
        error: error,
      });
    }

    let id = req.params.id;
    let data = {
      judul: req.body.judul,
      tahun_terbit: req.body.tahun_terbit,
      id_kategori: req.body.id_kategori,
      id_penulis: req.body.id_penulis,
      id_penerbit: req.body.id_penerbit,
    };
    connect.query(
      "UPDATE buku set ? WHERE id_buku=?",
      [data, id],
      (err, rows) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Internal Server Error",
          });
        } else {
          return res.status(201).json({
            status: true,
            message: "Data buku berhasil diupdate",
            payload: data,
          });
        }
      }
    );
  }
);
router.delete("/(:id)", (req, res) => {
  let id = req.params.id;
  connect.query("DELETE FROM buku WHERE id_buku=?", id, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data buku berhasil didelete",
      });
    }
  });
});

module.exports = router;
