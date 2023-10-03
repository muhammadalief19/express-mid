const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connect = require("../config/db.js");

router.get("/", (req, res) => {
  connect.query("SELECT * FROM penerbit", (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data penerbit",
        payload: rows,
      });
    }
  });
});
router.post("/", [body("nama_penerbit").notEmpty()], (req, res) => {
  const error = validationResult(req);

  // if validation failed
  if (!error.isEmpty()) {
    return res.status(422).json({
      error: error,
    });
  }

  let data = {
    nama_penerbit: req.body.nama_penerbit,
  };
  connect.query("INSERT INTO penerbit set ? ", data, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
        error: err,
      });
    } else {
      return res.status(201).json({
        status: true,
        message: "Data penerbit berhasil ditambahkan",
        payload: data,
      });
    }
  });
});
router.get("/(:id)", (req, res) => {
  let id = req.params.id;
  connect.query(
    "SELECT * FROM penerbit WHERE id_penerbit=?",
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
          message: "Data penerbit",
          payload: rows[0],
        });
      }
    }
  );
});
router.patch("/(:id)", [body("nama_penerbit").notEmpty()], (req, res) => {
  const error = validationResult(req);

  // if validation failed
  if (!error.isEmpty()) {
    return res.status(422).json({
      error: error,
    });
  }

  let id = req.params.id;
  let data = {
    nama_penerbit: req.body.nama_penerbit,
  };
  connect.query(
    "UPDATE penerbit set ? WHERE id_penerbit=?",
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
          message: "Data penerbit berhasil diupdate",
          payload: data,
        });
      }
    }
  );
});
router.delete("/(:id)", (req, res) => {
  let id = req.params.id;
  connect.query("DELETE FROM penerbit WHERE id_penerbit=?", id, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data penerbit berhasil didelete",
      });
    }
  });
});

module.exports = router;
