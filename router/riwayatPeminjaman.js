const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connect = require("../config/db.js");
let date = new Date();

router.get("/", (req, res) => {
  connect.query(
    "SELECT rp.tanggal_pengembalian, p.tanggal_peminjaman, b.judul, a.nama as peminjam FROM riwayat_peminjaman as rp INNER JOIN peminjaman as p ON rp.id_peminjaman = p.id_peminjaman INNER JOIN buku as b ON rp.id_buku = b.id_buku INNER JOIN anggota as a ON p.id_anggota = a.id_anggota",
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
          error: err,
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data riwayat peminjaman",
          payload: rows,
        });
      }
    }
  );
});
router.post(
  "/",
  [body("id_peminjaman").notEmpty(), body("id_buku").notEmpty()],
  (req, res) => {
    const error = validationResult(req);

    // if validation failed
    if (!error.isEmpty()) {
      return res.status(422).json({
        error: error,
      });
    }

    let data = {
      tanggal_pengembalian: `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`,
      id_peminjaman: req.body.id_peminjaman,
      id_buku: req.body.id_buku,
    };
    connect.query(
      "INSERT INTO riwayat_peminjaman set ? ",
      data,
      (err, rows) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: err,
          });
        } else {
          return res.status(201).json({
            status: true,
            message: "Data riwayat peminjaman berhasil ditambahkan",
            payload: data,
          });
        }
      }
    );
  }
);
router.get("/(:id)", (req, res) => {
  let id = req.params.id;
  connect.query(
    "SELECT rp.tanggal_pengembalian, p.tanggal_peminjaman, b.judul, a.nama as peminjam FROM riwayat_peminjaman as rp INNER JOIN peminjaman as p ON rp.id_peminjaman = p.id_peminjaman INNER JOIN buku as b ON rp.id_buku = b.id_buku INNER JOIN anggota as a ON p.id_anggota = a.id_anggota WHERE id_riwayat=?",
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
          message: "Data riwayat peminjaman",
          payload: rows[0],
        });
      }
    }
  );
});
router.patch(
  "/(:id)",
  [body("id_peminjaman").notEmpty(), body("id_buku").notEmpty()],
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
      tanggal_pengembalian: `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`,
      id_peminjaman: req.body.id_peminjaman,
      id_buku: req.body.id_buku,
    };
    connect.query(
      "UPDATE riwayat_peminjaman set ? WHERE id_riwayat=?",
      [data, id],
      (err, rows) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: err,
          });
        } else {
          return res.status(201).json({
            status: true,
            message: "Data riwayat peminjaman berhasil diupdate",
            payload: data,
          });
        }
      }
    );
  }
);
router.delete("/(:id)", (req, res) => {
  let id = req.params.id;
  connect.query(
    "DELETE FROM riwayat_peminjaman WHERE id_riwayat=?",
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
          message: "Data riwayat peminjaman berhasil didelete",
        });
      }
    }
  );
});

module.exports = router;
