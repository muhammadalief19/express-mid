let mysql = require("mysql");

let connect = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "db_perpus",
});

connect.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Connection Success !");
  }
});

module.exports = connect;
