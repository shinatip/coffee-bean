import express from "express";
import cors from "cors";
import mysql from "mysql";

const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  return next();
});

const connection = mysql.createConnection({
  host: "localhost",
  port: "33306",
  user: "root",
  database: "coffee",
});
connection.connect((err) => {
  if (err) {
    console.log("ERROR connection to mySQL = ", err);
    return;
  }
  console.log("MySQL successfully connected!!!");
});

app.post("/create", (req, res) => {
  console.log(req.body);
  const { party_Type, name, country, buy_price, sell_price } = req.body;
  try {
    connection.query(
      "INSERT INTO trade_prices(party_Type, name, country, buy_price, sell_price) VALUES(?,?,?,?,?)",
      [party_Type, name, country, buy_price, sell_price],
      (err, results, fields) => {
        if (err) {
          console.log("Error insert data: ", err);
          return res.status(500).send();
        }
        return res.status(200).json({ massage: "Insert successfuly" });
      }
    );
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
});

app.get("/findname", (req, res) => {
  console.log(req.query.name);
  try {
    connection.query(
      "SELECT * FROM trade_prices WHERE name = ?",
      req.query.name,
      (err, results, fields) => {
        if (err) {
          console.log("Error insert data: ", err);
          return res.status(500).send();
        }
        return res.status(200).json(results);
      }
    );
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
});

app.put("/update", (req, res) => {
  console.log("/update", req.body);
  console.log(req.body.party_Type);
  // const [party_Type, country, buy_price, sell_price, name] = req.body;
  // console.log(party_Type, country, buy_price, sell_price, name);
  try {
    connection.query(
      `UPDATE trade_prices SET party_Type = ?, country = ?, buy_price= ?, sell_price= ? WHERE name = ?`,
      [
        req.body.party_Type,
        req.body.country,
        req.body.buy_price,
        req.body.sell_price,
        req.body.name,
      ],
      (err, results, fields) => {
        if (err) {
          console.log("Error insert data: ", err);
          return res.status(500).send();
        }
        console.log(results);
        return res.status(200).json();
      }
    );
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
});

app.get("/data", (req, res) => {
  let conditionArr = [];
  if (req.query.name) {
    let nameCon = `name LIKE '${req.query.name}%'`;
    conditionArr.push(nameCon);
  }
  if (req.query.country) {
    let countryCon = `country LIKE '${req.query.country}%'`;
    conditionArr.push(countryCon);
  }
  let condition = "";
  if (conditionArr.length !== 0) {
    condition = "WHERE " + conditionArr.join(" OR ");
  }

  try {
    connection.query(
      `SELECT * FROM trade_prices ${condition}`,
      (err, results, fields) => {
        if (err) {
          console.log("Error query data: ", err);
          return res.status(500).send();
        }
        return res.status(200).json(results);
      }
    );
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
});

app.get("/", (req, res) => {
  res.json({
    users: [
      { name: "abby", lastname: "doe" },
      { name: "rob", lastname: "doe" },
    ],
  });
});

app.listen(5001, () => console.log("Server listen on port 5001"));
