var express = require('express');
var router = express.Router();
var mysql = require('../mysql');

router.post('/getMatkul', async (req, res) => {
    const {Email} = req.body;
    try {
        const jurusanID = await mysql.query('SELECT ID FROM jurusan u WHERE u.Email LIKE ?', [Email]);
        const matkul = await mysql.query('SELECT * FROM matkul m WHERE m.JurusanID LIKE ?', [jurusanID[0][0].ID]);
        res.status(200).json(matkul[0]);
    } catch (err) {
      console.error('Error fetching users:', err);
      res.status(500).send(err.message);
    }
  });

module.exports = router;