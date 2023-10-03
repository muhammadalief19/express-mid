const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connect = require("../config/db.js");

router.get("/", (req, res) => {
  connect.query("SELECT * FROM kategori_buku", (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data kategori buku",
        payload: rows,
      });
    }
  });
});
router.post("/", [body("nama_kategori").notEmpty()], (req, res) => {
  const error = validationResult(req);

  // if validation failed
  if (!error.isEmpty()) {
    return res.status(422).json({
      error: error,
    });
  }

  let data = {
    nama_kategori: req.body.nama_kategori,
  };
  connect.query("INSERT INTO kategori_buku set ? ", data, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
        error: err,
      });
    } else {
      return res.status(201).json({
        status: true,
        message: "Data kategori buku berhasil ditambahkan",
        payload: data,
      });
    }
  });
});
router.get("/(:id)", (req, res) => {
  let id = req.params.id;
  connect.query(
    "SELECT * FROM kategori_buku WHERE id_kategori=?",
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
          message: "Data kategori buku",
          payload: rows[0],
        });
      }
    }
  );
});
router.patch("/(:id)", [body("nama_kategori").notEmpty()], (req, res) => {
  const error = validationResult(req);

  // if validation failed
  if (!error.isEmpty()) {
    return res.status(422).json({
      error: error,
    });
  }

  let id = req.params.id;
  let data = {
    nama_kategori: req.body.nama_kategori,
  };
  connect.query(
    "UPDATE kategori_buku set ? WHERE id_kategori=?",
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
          message: "Data kategori buku berhasil diupdate",
          payload: data,
        });
      }
    }
  );
});
router.delete("/(:id)", (req, res) => {
  let id = req.params.id;
  connect.query(
    "DELETE FROM kategori_buku WHERE id_kategori=?",
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
          message: "Data kategori buku berhasil didelete",
        });
      }
    }
  );
});

module.exports = router;
