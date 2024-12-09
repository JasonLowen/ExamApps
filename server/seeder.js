var express = require('express');
var mysql = require('./mysql');

async function run(){
    try {
        await mysql.query(`SET FOREIGN_KEY_CHECKS = 0;`);
        await mysql.query(
            `DROP TABLE IF EXISTS user`
        );
        await mysql.query(
            `DROP TABLE IF EXISTS jurusan`
        );
        await mysql.query(
            `DROP TABLE IF EXISTS penjadwalan`
        );
        await mysql.query(
            `DROP TABLE IF EXISTS pic`
        );
        await mysql.query(
            `DROP TABLE IF EXISTS percetakan`
        );
        await mysql.query(
            `DROP TABLE IF EXISTS administrasi`
        );
        await mysql.query(
            `DROP TABLE IF EXISTS pengawas`
        );
        await mysql.query(
            `DROP TABLE IF EXISTS mahasiswa`
        );
        await mysql.query(
            `DROP TABLE IF EXISTS dosen`
        );
        await mysql.query(
            `DROP TABLE IF EXISTS matkul`
        );
        await mysql.query(
            `DROP TABLE IF EXISTS ruangan`
        );
        await mysql.query(
            `DROP TABLE IF EXISTS ujian`
        );
        await mysql.query(
            `DROP TABLE IF EXISTS kehadiran`
        );
        await mysql.query(`SET FOREIGN_KEY_CHECKS = 1;`);
        console.log("Refresh Database");

        await mysql.query(
            `CREATE TABLE IF NOT EXISTS user (
                Email VARCHAR(255) PRIMARY KEY,
                Password VARCHAR(255) NOT NULL,
                Role VARCHAR(255) NOT NULL
            )`
        );
        console.log("User table created");

        await mysql.query(
            `CREATE TABLE IF NOT EXISTS jurusan (
                ID VARCHAR(255) PRIMARY KEY,
                Nama VARCHAR(255) NOT NULL,
                Email VARCHAR(255) NOT NULL,
                NamaJurusan VARCHAR(255) NOT NULL,
                FOREIGN KEY (Email) REFERENCES user(Email) ON DELETE CASCADE
            )`
        );
        console.log("Major table created");

        await mysql.query(
            `CREATE TABLE IF NOT EXISTS penjadwalan (
                ID VARCHAR(255) PRIMARY KEY,
                Nama VARCHAR(255) NOT NULL,
                Email VARCHAR(255) NOT NULL,
                FOREIGN KEY (Email) REFERENCES user(Email) ON DELETE CASCADE
            )`
        );
        console.log("Scheduling table created");

        await mysql.query(
            `CREATE TABLE IF NOT EXISTS pic (
                ID VARCHAR(255) PRIMARY KEY,
                Nama VARCHAR(255) NOT NULL,
                Email VARCHAR(255) NOT NULL,
                FOREIGN KEY (Email) REFERENCES user(Email) ON DELETE CASCADE
            )`
        );
        console.log("PIC table created");

        await mysql.query(
            `CREATE TABLE IF NOT EXISTS percetakan (
                ID VARCHAR(255) PRIMARY KEY,
                Nama VARCHAR(255) NOT NULL,
                Email VARCHAR(255) NOT NULL,
                FOREIGN KEY (Email) REFERENCES user(Email) ON DELETE CASCADE
            )`
        );
        console.log("Printing table created");

        await mysql.query(
            `CREATE TABLE IF NOT EXISTS administrasi (
                ID VARCHAR(255) PRIMARY KEY,
                Nama VARCHAR(255) NOT NULL,
                Email VARCHAR(255) NOT NULL,
                FOREIGN KEY (Email) REFERENCES user(Email) ON DELETE CASCADE
            )`
        );
        console.log("Administration table created");

        await mysql.query(
            `CREATE TABLE IF NOT EXISTS pengawas (
                ID VARCHAR(255) PRIMARY KEY,
                Nama VARCHAR(255) NOT NULL,
                Email VARCHAR(255) NOT NULL,
                FOREIGN KEY (Email) REFERENCES user(Email) ON DELETE CASCADE
            )`
        );
        console.log("Supervisor table created");

        await mysql.query(
            `CREATE TABLE IF NOT EXISTS mahasiswa (
                NIM BIGINT PRIMARY KEY,
                Nama VARCHAR(255) NOT NULL,
                Email VARCHAR(255) NOT NULL,
                JurusanID VARCHAR(255) NOT NULL,
                FOREIGN KEY (Email) REFERENCES user(Email) ON DELETE CASCADE
            )`
        );
        console.log("Student table created");

        await mysql.query(
            `CREATE TABLE IF NOT EXISTS dosen (
                ID VARCHAR(255) PRIMARY KEY,
                Nama VARCHAR(255) NOT NULL,
                Email VARCHAR(255) NOT NULL,
                FOREIGN KEY (Email) REFERENCES user(Email) ON DELETE CASCADE
            )`
        );
        console.log("Lecturer table created");

        await mysql.query(
            `CREATE TABLE IF NOT EXISTS matkul (
                ID VARCHAR(255) PRIMARY KEY,
                NamaMatkul VARCHAR(255) NOT NULL,
                JurusanID VARCHAR(255) NOT NULL,
                DosenID VARCHAR(255) NOT NULL,
                MemilikiUjian VARCHAR(255) NOT NULL,
                FOREIGN KEY (JurusanID) REFERENCES jurusan(ID) ON DELETE CASCADE,
                FOREIGN KEY (DosenID) REFERENCES dosen(ID) ON DELETE CASCADE
            )`
        );
        console.log("Subject table created");

        await mysql.query(
            `CREATE TABLE IF NOT EXISTS ruangan (
                ID VARCHAR(255) PRIMARY KEY,
                NomorRuangan INTEGER(10) NOT NULL,
                Kapasitas INTEGER(10) NOT NULL
            )`
        );
        console.log("Room table created");

        await mysql.query(
            `CREATE TABLE IF NOT EXISTS ujian (
                ID VARCHAR(255) PRIMARY KEY,
                RoomID VARCHAR(255) NOT NULL,
                MatkulID VARCHAR(255) NOT NULL,
                Tanggal DATE,
                PIC VARCHAR(255),
                Soal VARCHAR(255),
                PengawasID VARCHAR(255),
                StatusUjian VARCHAR(255) NOT NULL,
                FOREIGN KEY (RoomID) REFERENCES ruangan(ID) ON DELETE CASCADE,
                FOREIGN KEY (MatkulID) REFERENCES matkul(ID) ON DELETE CASCADE,
                FOREIGN KEY (PIC) REFERENCES pic(ID) ON DELETE CASCADE,
                FOREIGN KEY (PengawasID) REFERENCES pengawas(ID) ON DELETE CASCADE
            )`
        );
        console.log("Exam table created");

        await mysql.query(
            `CREATE TABLE IF NOT EXISTS kehadiran (
                ID VARCHAR(255) PRIMARY KEY,
                MahasiswaNIM BIGINT NOT NULL,
                StatusKehadiran VARCHAR(255) NOT NULL,
                Nilai INTEGER(10),
                UjianID VARCHAR(255) NOT NULL,
                FOREIGN KEY (MahasiswaNIM) REFERENCES mahasiswa(NIM) ON DELETE CASCADE,
                FOREIGN KEY (UjianID) REFERENCES ujian(ID) ON DELETE CASCADE
            )`
        );
        console.log("Attendance table created");

        await mysql.query(
            `INSERT INTO user (Email, Password, Role) VALUES
            ('agus.santoso@gmail.com', '2$x#f3!lKQ', 'Lecturer'),
            ('andi.pratama@gmail.com', '1a!TpX@9$', 'Jurusan'),
            ('budi.setiawan@gmail.com', 'Vp2T#cX@q', 'Penjadwalan'),
            ('citra.putri@gmail.com', '9qX$T@Vp2', 'PIC'),
            ('dwi.kartini@gmail.com', '3$cVpT@X#', 'Percetakan'),
            ('edi.hartono@gmail.com', 'Tq1@cVpX$', 'Administrasi'),
            ('fauzi.rahman@gmail.com', 'Xq9$VpTc3', 'Pengawas'),
            ('gina.susanti@gmail.com', 'T@3qVp$cX', 'Mahasiswa'),
            ('hendro.susilo@gmail.com', '2$VpX@Tcq', 'Dosen'),
            ('irma.marlina@gmail.com', 'qT$9VpX@c2', 'Jurusan'),
            ('joko.wibowo@gmail.com', 'Vp@cT$qX3', 'Penjadwalan'),
            ('kiki.saputra@gmail.com', 'X3qVp$T@2', 'PIC'),
            ('lina.amalia@gmail.com', 'TqX$Vp@c9', 'Percetakan'),
            ('maria.lestari@gmail.com', '3$cVpX@qT', 'Administrasi'),
            ('nina.maharani@gmail.com', 'Vp$qT@X3c', 'Pengawas'),
            ('opik.suryadi@gmail.com', 'T$VpXq@39', 'Mahasiswa'),
            ('putra.muhammad@gmail.com', '9XqT$cVp@2', 'Dosen'),
            ('qori.azizah@gmail.com', 'Tq2$Vp@X9', 'Jurusan'),
            ('rudi.firmansyah@gmail.com', 'qX$VpT@c39', 'Penjadwalan'),
            ('siti.fatimah@gmail.com', 'T@qVpX$c2', 'PIC'),
            ('toni.prakoso@gmail.com', 'VpT$@qX3c', 'Percetakan'),
            ('umar.ramadhan@gmail.com', 'XqVp$cT@92', 'Administrasi'),
            ('vina.sari@gmail.com', 'qT@Vp$cX9', 'Pengawas'),
            ('wahyu.hidayat@gmail.com', '3$cTqX@Vp2', 'Mahasiswa'),
            ('yana.kusuma@gmail.com', 'qVpT$cX@93', 'Dosen'),
            ('zaki.alim@gmail.com', 'T@Vp$qX39', 'Jurusan'),
            ('bella.rachma@gmail.com', 'VpX@q$cT92', 'Penjadwalan'),
            ('cecep.rahmat@gmail.com', '9$cVpT@Xq3', 'PIC'),
            ('dian.wardani@gmail.com', 'Tq$VpX@3c9', 'Percetakan'),
            ('eka.susanto@gmail.com', 'X@qVp$cT93', 'Administrasi'),
            ('farah.adinda@gmail.com', 'T$9VpXq@3c', 'Pengawas'),
            ('gina.julianti@gmail.com', 'Vp$cqX@T29', 'Mahasiswa'),
            ('heni.nuraini@gmail.com', 'TqX$c@Vp93', 'Dosen'),
            ('ivan.firmansyah@gmail.com', 'Vp@X3q$cT9', 'Jurusan'),
            ('joni.mulyadi@gmail.com', 'qVp$cX@T92', 'Penjadwalan'),
            ('karen.putri@gmail.com', 'X$cTqVp@39', 'PIC'),
            ('lusi.rosyidah@gmail.com', 'VpTq$cX@93', 'Percetakan'),
            ('miko.ramli@gmail.com', 'qX$T@Vp93c', 'Administrasi'),
            ('nurul.hidayah@gmail.com', 'T$VpX@q3c9', 'Pengawas')`
        );
        console.log("User data inserted");

        await mysql.query(
            `INSERT INTO jurusan (ID, Nama, Email, NamaJurusan) VALUES
            ('JU001', 'Andi Pratama', 'andi.pratama@gmail.com', 'Jurusan01'),
            ('JU002', 'Qori Azizah', 'qori.azizah@gmail.com', 'Jurusan02')`
        );
        console.log("Major data inserted");

        await mysql.query(
            `INSERT INTO penjadwalan (ID, Nama, Email) VALUES
            ('JA001', 'Budi Setiawan', 'budi.setiawan@gmail.com'),
            ('JA002', 'Joko Wibowo', 'joko.wibowo@gmail.com'),
            ('JA003', 'Rudi Firmansyah', 'rudi.firmansyah@gmail.com'),
            ('JA004', 'Bella Rachma', 'bella.rachma@gmail.com'),
            ('JA005', 'Joni Mulyadi', 'joni.mulyadi@gmail.com')`
        );
        console.log("Scheduling Team data inserted");

        await mysql.query(
            `INSERT INTO pic (ID, Nama, Email) VALUES
            ('PI001', 'Citra Putri', 'citra.putri@gmail.com'),
            ('PI002', 'Kiki Saputra', 'kiki.saputra@gmail.com'),
            ('PI003', 'Siti Fatimah', 'siti.fatimah@gmail.com'),
            ('PI004', 'Cecep Rahmat', 'cecep.rahmat@gmail.com'),
            ('PI005', 'Karen Putri', 'karen.putri@gmail.com')`
        );
        console.log("PIC data inserted");

        await mysql.query(
            `INSERT INTO percetakan (ID, Nama, Email) VALUES
            ('PE001', 'Dwi Kartini', 'dwi.kartini@gmail.com'),
            ('PE002', 'Lina Amalia', 'lina.amalia@gmail.com'),
            ('PE003', 'Toni Prakoso', 'toni.prakoso@gmail.com'),
            ('PE004', 'Dian Wardani', 'dian.wardani@gmail.com'),
            ('PE005', 'Lusi Rosyidah', 'lusi.rosyidah@gmail.com')`
        );
        console.log("Printing Team data inserted");

        await mysql.query(
            `INSERT INTO administrasi (ID, Nama, Email) VALUES
            ('AD001', 'Edi Hartono', 'edi.hartono@gmail.com'),
            ('AD002', 'Umar Ramadhan', 'umar.ramadhan@gmail.com'),
            ('AD003', 'Miko Ramli', 'miko.ramli@gmail.com')`
        );
        console.log("Administration Team data inserted");

        await mysql.query(
            `INSERT INTO pengawas (ID, Nama, Email) VALUES
            ('PG001', 'Fauzi Rahman', 'fauzi.rahman@gmail.com'),
            ('PG002', 'Nina Maharani', 'nina.maharani@gmail.com'),
            ('PG003', 'Vina Sari', 'vina.sari@gmail.com'),
            ('PG004', 'Farah Adinda', 'farah.adinda@gmail.com'),
            ('PG005', 'Nurul Hidayah', 'nurul.hidayah@gmail.com')`
        );
        console.log("Supervisor data inserted");

        await mysql.query(
            `INSERT INTO mahasiswa (NIM, Nama, Email, JurusanID) VALUES
            (2602095738, 'Gina Susanti', 'gina.susanti@gmail.com', 'JU001'),
            (2602094827, 'Opik Suryadi', 'opik.suryadi@gmail.com', 'JU002'),
            (2602099382, 'Wahyu Hidayat', 'wahyu.hidayat@gmail.com', 'JU001'),
            (2602097615, 'Gina Julianti', 'gina.julianti@gmail.com', 'JU002')`
        );
        console.log("Student data inserted");

        await mysql.query(
            `INSERT INTO dosen (ID, Nama, Email) VALUES
            ('D001', 'Agus Santoso', 'agus.santoso@gmail.com'),
            ('D002', 'Hendro Susilo', 'hendro.susilo@gmail.com'),
            ('D003', 'Irma Marlina', 'irma.marlina@gmail.com'),
            ('D004', 'Maria Lestari', 'maria.lestari@gmail.com'),
            ('D005', 'Putra Muhammad', 'putra.muhammad@gmail.com'),
            ('D006', 'Yana Kusuma', 'yana.kusuma@gmail.com'),
            ('D007', 'Zaki Alim', 'zaki.alim@gmail.com'),
            ('D008', 'Eka Susanto', 'eka.susanto@gmail.com'),
            ('D009', 'Heni Nuraini', 'heni.nuraini@gmail.com'),
            ('D010', 'Ivan Firmansyah', 'ivan.firmansyah@gmail.com')`
        );
        console.log("Lecturer data inserted");

        await mysql.query(
            `INSERT INTO matkul (ID, NamaMatkul, JurusanID, DosenID, MemilikiUjian) VALUES
            ('M001', 'Algoritma Pemrograman', 'JU001', 'D001', 'Tidak'),
            ('M002', 'Struktur Data', 'JU001', 'D002', 'Tidak'),
            ('M003', 'Basis Data', 'JU002', 'D003', 'Tidak'),
            ('M004', 'Pemrograman Web', 'JU002', 'D004', 'Tidak'),
            ('M005', 'Kecerdasan Buatan', 'JU001', 'D005', 'Tidak'),
            ('M006', 'Jaringan Komputer', 'JU002', 'D006', 'Tidak'),
            ('M007', 'Sistem Operasi', 'JU001', 'D007', 'Tidak'),
            ('M008', 'Keamanan Sistem Informasi', 'JU002', 'D008', 'Tidak'),
            ('M009', 'Rekayasa Perangkat Lunak', 'JU001', 'D009', 'Tidak'),
            ('M010', 'Manajemen Proyek TI', 'JU002', 'D010', 'Tidak')`
        );
        console.log("Subject data inserted");  

        await mysql.query(
            `INSERT INTO ruangan (ID, NomorRuangan, Kapasitas) VALUES
            ('RU001', 543, 36),
            ('RU002', 762, 44),
            ('RU003', 198, 39),
            ('RU004', 354, 42),
            ('RU005', 877, 45),
            ('RU006', 429, 38),
            ('RU007', 612, 30),
            ('RU008', 745, 50),
            ('RU009', 380, 34),
            ('RU010', 999, 47)`
        );
        console.log("Room data inserted");
        
    } catch (err) {
        console.log(err);
    }
}

module.exports = run;