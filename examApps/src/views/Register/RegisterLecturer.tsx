import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './RegisterRole.css'

const RegisterLecturer = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');

    const generateRandomID = () => {
        const randomID = Math.floor(100 + Math.random() * 900).toString();
        const resultID = 'D' + randomID;
        return resultID;
    };

    const handleRegisterLecturer = async (e: any) => {
        e.preventDefault();
        try {
        const lecturerData = {
            ID: generateRandomID(),
            Nama: name,
            Email: email,
            Password: password,
        };
        const response = await fetch('http://localhost:3000/api/users/registerLecturer', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(lecturerData),
        });
        window.location.href = "/";
        const result = await response.json();
    } catch (error: any) {
    console.error('Error:', error.message);
    }
    };

    useEffect(() => {
        localStorage.removeItem('email');
        localStorage.removeItem('namaRole');
        }, []);

    return (
        <section id='registerRolePage'>
            <div className="registerRoleContainer">
                <div className="registerRoleContent">
                    <form onSubmit={handleRegisterLecturer}>
                        <h2>Lecturer Register</h2>
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

export default RegisterLecturer