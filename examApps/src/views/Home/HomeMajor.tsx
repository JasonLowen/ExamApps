import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
// import './RegisterRole.css'

const HomeMajor = () => {

   const emailLocal = localStorage.getItem('email');
   const [email, setEmail] = useState(emailLocal);
   const [matkul, setMatkul] = useState([]);

    const getMatkul = async () => {
        try {
            const emailData = {
                Email: email
            };
            const response = await fetch('http://localhost:3000/api/home/getMatkul', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData),
        });
            const result = await response.json();
            setMatkul(result);
            } catch (error: any) {
            console.error('Error:', error.message);
        }
    }

    useEffect(() => {
        const emailLocal = localStorage.getItem('email');
        const roleName = localStorage.getItem('namaRole');
        if (emailLocal == null || emailLocal == ''){
            window.location.href = "/";
        }
        if (roleName == null || roleName != "Jurusan"){
            window.location.href = "/";
        }
        setEmail(emailLocal);
        getMatkul();
    }, []);

  return (
    <section id='homeMajorPage'>
        <div className="listMatkulContainer">
            <table>
                <tr>
                    <th>No.</th>
                    <th>Subject</th>
                    <th>Memiliki Ujian</th>
                    <th>Tanggal Ujian</th>
                </tr>
                {matkul.map((m: any, index) => (
                    <>
                    <tr>
                        <td>{index}</td>
                        <td>{m.NamaMatkul}</td>
                        <td>{m.MemilikiUjian}</td>
                        <td>{m.MemilikiUjian == "Ya" ? "tes" : "tes1"}</td>
                    </tr>
                    </>
                ))}
            </table>
        </div>
        
    </section>
  )
}

export default HomeMajor