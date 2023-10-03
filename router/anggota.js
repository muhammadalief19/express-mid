const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connect = require("../config/db.js");

const randomId = function (length = 6) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
};

router.get("/", (req, res) => {
  connect.query("SELECT * FROM anggota", (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data Anggota",
        payload: rows,
      });
    }
  });
});
router.post(
  "/",
  [body("nama_anggota").notEmpty(), body("alamat").notEmpty()],
  (req, res) => {
    const error = validationResult(req);

    // if validation failed
    if (!error.isEmpty()) {
      return res.status(422).json({
        error: error,
      });
    }

    let data = {
      nama: req.body.nama_anggota,
      nomor_identitas: randomId(10),
      alamat: req.body.alamat,
    };
    connect.query("INSERT INTO anggota set ? ", data, (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
          error: err,
        });
      } else {
        return res.status(201).json({
          status: true,
          message: "Data anggota berhasil ditambahkan",
          payload: data,
        });
      }
    });
  }
);
router.get("/(:id)", (req, res) => {
  let id = req.params.id;
  connect.query("SELECT * FROM anggota WHERE id_anggota=?", id, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data anggota",
        payload: rows[0],
      });
    }
  });
});
router.patch(
  "/(:id)",
  [body("nama_anggota").notEmpty(), body("alamat").notEmpty()],
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
      nama: req.body.nama_anggota,
      alamat: req.body.alamat,
    };
    connect.query(
      "UPDATE anggota set ? WHERE id_anggota=?",
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
            message: "Data anggota berhasil diupdate",
            payload: data,
          });
        }
      }
    );
  }
);
router.delete("/(:id)", (req, res) => {
  let id = req.params.id;
  connect.query("DELETE FROM anggota WHERE id_anggota=?", id, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data anggota berhasil didelete",
      });
    }
  });
});

module.exports = router;
