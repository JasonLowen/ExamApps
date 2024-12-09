var express = require('express');
var router = express.Router();
var mysql = require('../mysql');

router.post('/registerMajor', async (req, res) => {
  const {ID, Nama, Email, Password, NamaJurusan} = req.body;
  try {
    const query1 = 'INSERT INTO user (Email, Password, Role) VALUES (?, ?, ?)';
    await mysql.query(query1, [Email, Password, "Jurusan"]);
    
    const query2 = 'INSERT INTO jurusan (ID, Nama, Email, NamaJurusan) VALUES (?, ?, ?, ?)';
    await mysql.query(query2, [ID, Nama, Email, NamaJurusan]);
    res.status(200).send('Major created');
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send(err.message);
  }
});

router.post('/registerScheduling', async (req, res) => {
  const {ID, Nama, Email, Password} = req.body;
  try {
    const query1 = 'INSERT INTO user (Email, Password, Role) VALUES (?, ?, ?)';
    await mysql.query(query1, [Email, Password, "Penjadwalan"]);
    
    const query2 = 'INSERT INTO penjadwalan (ID, Nama, Email) VALUES (?, ?, ?)';
    await mysql.query(query2, [ID, Nama, Email]);
    res.status(200).send('Scheduling Team created');
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send(err.message);
  }
});

router.post('/registerPIC', async (req, res) => {
  const {ID, Nama, Email, Password} = req.body;
  try {
    const query1 = 'INSERT INTO user (Email, Password, Role) VALUES (?, ?, ?)';
    await mysql.query(query1, [Email, Password, "PIC"]);
    
    const query2 = 'INSERT INTO pic (ID, Nama, Email) VALUES (?, ?, ?)';
    await mysql.query(query2, [ID, Nama, Email]);
    res.status(200).send('PIC created');
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send(err.message);
  }
});

router.post('/registerPrinting', async (req, res) => {
  const {ID, Nama, Email, Password} = req.body;
  try {
    const query1 = 'INSERT INTO user (Email, Password, Role) VALUES (?, ?, ?)';
    await mysql.query(query1, [Email, Password, "Percetakan"]);
    
    const query2 = 'INSERT INTO percetakan (ID, Nama, Email) VALUES (?, ?, ?)';
    await mysql.query(query2, [ID, Nama, Email]);
    res.status(200).send('Printing Team created');
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send(err.message);
  }
});

router.post('/registerAdministration', async (req, res) => {
  const {ID, Nama, Email, Password} = req.body;
  try {
    const query1 = 'INSERT INTO user (Email, Password, Role) VALUES (?, ?, ?)';
    await mysql.query(query1, [Email, Password, "Administrasi"]);
    
    const query2 = 'INSERT INTO administrasi (ID, Nama, Email) VALUES (?, ?, ?)';
    await mysql.query(query2, [ID, Nama, Email]);
    res.status(200).send('Administration Team created');
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send(err.message);
  }
});

router.post('/registerSupervisor', async (req, res) => {
  const {ID, Nama, Email, Password} = req.body;
  try {
    const query1 = 'INSERT INTO user (Email, Password, Role) VALUES (?, ?, ?)';
    await mysql.query(query1, [Email, Password, "Pengawas"]);
    
    const query2 = 'INSERT INTO pengawas (ID, Nama, Email) VALUES (?, ?, ?)';
    await mysql.query(query2, [ID, Nama, Email]);
    res.status(200).send('Exam Supervisor created');
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send(err.message);
  }
});

router.get('/getAvailableMajor', async (req, res) => {
  try {
    const query1 = 'SELECT * FROM jurusan';
    const majors = await mysql.query(query1);

    res.status(200).json({ availableMajor: majors[0] });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send(err.message);
  }
});

router.post('/registerStudent', async (req, res) => {
  const {NIM, Nama, Email, Password, Jurusan} = req.body;
  try {
    const query1 = 'INSERT INTO user (Email, Password, Role) VALUES (?, ?, ?)';
    await mysql.query(query1, [Email, Password, "Mahasiswa"]);
    
    const query2 = 'INSERT INTO mahasiswa (NIM, Nama, Email, JurusanID) VALUES (?, ?, ?, ?)';
    await mysql.query(query2, [NIM, Nama, Email, Jurusan]);
    res.status(200).send('Student created');
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send(err.message);
  }
});

router.post('/registerLecturer', async (req, res) => {
  const {ID, Nama, Email, Password} = req.body;
  try {
    const query1 = 'INSERT INTO user (Email, Password, Role) VALUES (?, ?, ?)';
    await mysql.query(query1, [Email, Password, "Dosen"]);
    
    const query2 = 'INSERT INTO dosen (ID, Nama, Email) VALUES (?, ?, ?)';
    await mysql.query(query2, [ID, Nama, Email]);
    res.status(200).send('Lecturer created');
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send(err.message);
  }
});

router.post('/login', async (req, res) => {
  const {Email, Password} = req.body;
  try {
    const roleUser = await mysql.query('SELECT Role FROM user u WHERE u.Email = ? AND u.Password = ?', [Email, Password]);
    console.log('ROLE = ', roleUser[0][0].Role); 
    if (roleUser && roleUser[0][0].Role.length > 0) {
      console.log('Role: ' + roleUser[0][0].Role);
    } else {
      console.log('No role found for this email');
    }
    res.status(200).json(roleUser[0][0].Role);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send(err.message); 
  }
});

module.exports = router;
