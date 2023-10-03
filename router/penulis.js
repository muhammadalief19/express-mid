const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connect = require("../config/db.js");

router.get("/", (req, res) => {
  connect.query("SELECT * FROM penulis", (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data penulis",
        payload: rows,
      });
    }
  });
});
router.post("/", [body("nama_penulis").notEmpty()], (req, res) => {
  const error = validationResult(req);

  // if validation failed
  if (!error.isEmpty()) {
    return res.status(422).json({
      error: error,
    });
  }

  let data = {
    nama_penulis: req.body.nama_penulis,
  };
  connect.query("INSERT INTO penulis set ? ", data, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
        error: err,
      });
    } else {
      return res.status(201).json({
        status: true,
        message: "Data penulis berhasil ditambahkan",
        payload: data,
      });
    }
  });
});
router.get("/(:id)", (req, res) => {
  let id = req.params.id;
  connect.query("SELECT * FROM penulis WHERE id_penulis=?", id, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data penulis",
        payload: rows[0],
      });
    }
  });
});
router.patch("/(:id)", [body("nama_penulis").notEmpty()], (req, res) => {
  const error = validationResult(req);

  // if validation failed
  if (!error.isEmpty()) {
    return res.status(422).json({
      error: error,
    });
  }

  let id = req.params.id;
  let data = {
    nama_penulis: req.body.nama_penulis,
  };
  connect.query(
    "UPDATE penulis set ? WHERE id_penulis=?",
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
          message: "Data penulis berhasil diupdate",
          payload: data,
        });
      }
    }
  );
});
router.delete("/(:id)", (req, res) => {
  let id = req.params.id;
  connect.query("DELETE FROM penulis WHERE id_penulis=?", id, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data penulis berhasil didelete",
      });
    }
  });
});

module.exports = router;
