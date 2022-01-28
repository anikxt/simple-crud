require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // support json encoded bodies

const db = mysql.createConnection(process.env.MYSQL_URL);

app.post('/create', (req, res) => {
  console.log(req.body);
  let { name, age, country, position, wage } = req.body;

  db.query(
    'INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)',
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send('Values Inserted');
      }
    }
  );
});

app.get('/employees', (req, res) => {
  db.query('SELECT * FROM employees', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put('/update', (req, res) => {
  const id = req.body.id;
  const wage = req.body.wage;
  db.query(
    'UPDATE employees SET wage = ? WHERE id = ?',
    [wage, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM employees WHERE id = ?', id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.use('/static', express.static('public/static'));
app.all('*', (req, res) =>
  res.sendFile('public/index.html', { root: __dirname })
);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Yay, your server is running on port ${PORT}`);
});
