import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './RegisterRole.css'

const RegisterStudent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [majors, setMajors] = useState([]);
    const [major, setMajor] = useState();

    const generateRandomNIM = () => {
        const randomNIM = Math.floor(100000 + Math.random() * 900000).toString();
        const resultNIM = '2602' + randomNIM;
        return resultNIM;
    };

    const getAvailableMajor = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/users/getAvailableMajor', {
          method: 'GET',
          headers: {
          'Content-Type': 'application/json',
          },});
          const result = await response.json();
          console.log('RESULT = ' + result);
          setMajors(result.availableMajor);
          } catch (error: any) {
          console.error('Error:', error.message);
        }
    }

    const handleRegisterStudent = async (e: any) => {
        e.preventDefault();
        try {
        const studentData = {
            NIM: generateRandomNIM(),
            Nama: name,
            Email: email,
            Password: password,
            Jurusan: major,
        };
        const response = await fetch('http://localhost:3000/api/users/registerStudent', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(studentData),
        });
        window.location.href = "/";
        const result = await response.json();
    } catch (error: any) {
    console.error('Error:', error.message);
    }
    };

    const handleChange = (e: any) => {
        console.log('tes = ' + e.target.value);
        setMajor(e.target.value);
    }; 

    useEffect(() => {
        localStorage.removeItem('email');
        localStorage.removeItem('namaRole');
        getAvailableMajor();
    }, []);

    return (
        <section id='registerRolePage'>
            <div className="registerRoleContainer">
                <div className="registerRoleContent">
                    <form onSubmit={handleRegisterStudent}>
                        <h2>Student Register</h2>
                        <div className="registerRoleInput">
                        <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        />
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="registerRoleInput">
                        <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="registerRoleInput">
                        <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="registerRoleInput">
                        <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        />
                        <label htmlFor="confirmPassword">Confirm Password</label>
                    </div>
                    <div className="dropdown-container">
                        <select
                            id="dropdown"
                            className="dropdown"
                            value={major}
                            onChange={handleChange}
                        >
                            <option value="">
                            -- Choose your major --
                            </option>
                            {majors.map((m: any, index: number) => (
                            <option key={index} value={m.ID}>
                                {m.NamaJurusan}
                            </option>
                            ))}
                        </select>
                    </div>
                        <button type='submit'>Register</button>
                        <div className="register">
                            <p>Wrong Role? <Link to="/register">Back to Register Page</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default RegisterStudent