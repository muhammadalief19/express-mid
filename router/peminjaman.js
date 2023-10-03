const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connect = require("../config/db.js");
let date = new Date();

router.get("/", (req, res) => {
  connect.query(
    "SELECT p.id_peminjaman, p.tanggal_peminjaman, a.nama as peminjam FROM peminjaman as p INNER JOIN anggota as a ON p.id_anggota = a.id_anggota",
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data peminjaman",
          payload: rows,
        });
      }
    }
  );
});
router.post("/", [body("id_anggota").notEmpty()], (req, res) => {
  const error = validationResult(req);

  // if validation failed
  if (!error.isEmpty()) {
    return res.status(422).json({
      error: error,
    });
  }

  let data = {
    tanggal_peminjaman: `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`,
    id_anggota: req.body.id_anggota,
  };
  connect.query("INSERT INTO peminjaman set ? ", data, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
        error: err,
      });
    } else {
      return res.status(201).json({
        status: true,
        message: "Data peminjaman berhasil ditambahkan",
        payload: data,
      });
    }
  });
});
router.get("/(:id)", (req, res) => {
  let id = req.params.id;
  connect.query(
    "SELECT p.id_peminjaman, p.tanggal_peminjaman, a.nama as peminjam FROM peminjaman as p INNER JOIN anggota as a ON p.id_anggota = a.id_anggota WHERE id_peminjaman=?",
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
          message: "Data peminjaman",
          payload: rows[0],
        });
      }
    }
  );
});
router.patch("/(:id)", [body("id_anggota").notEmpty()], (req, res) => {
  const error = validationResult(req);

  // if validation failed
  if (!error.isEmpty()) {
    return res.status(422).json({
      error: error,
    });
  }

  let id = req.params.id;
  let data = {
    tanggal_peminjaman: `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`,
    id_anggota: req.body.id_anggota,
  };
  connect.query(
    "UPDATE peminjaman set ? WHERE id_peminjaman=?",
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
          message: "Data peminjaman berhasil diupdate",
          payload: data,
        });
      }
    }
  );
});
router.delete("/(:id)", (req, res) => {
  let id = req.params.id;
  connect.query(
    "DELETE FROM peminjaman WHERE id_peminjaman=?",
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
          message: "Data peminjaman berhasil didelete",
        });
      }
    }
  );
});

module.exports = router;
