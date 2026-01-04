const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3001;

app.use(cors());

// MySQL bağlantısı
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '!@#123qwert',
  database: 'app_db'
});

db.connect((err) => {
  if (err) {
    console.error('MySQL bağlantı hatası:', err);
    return;
  }
  console.log('✅ MySQL bağlantısı başarılı!');
});

app.get('/api/questions', (req, res) => {
  db.query('SELECT * FROM app_question_body', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Sorgu hatası', details: err });
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`🚀 API çalışıyor: http://localhost:${port}`);
});
