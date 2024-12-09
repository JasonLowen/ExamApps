import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './RegisterRole.css'

const RegisterMajor = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [major, setMajor] = useState('');

    const generateRandomID = () => {
        const randomID = Math.floor(100 + Math.random() * 900).toString();
        const resultID = 'JU' + randomID;
        return resultID;
    };

    const handleRegisterMajor = async (e: any) => {
        e.preventDefault();
        try {
        const majorData = {
            ID: generateRandomID(),
            Nama: name,
            Email: email,
            Password: password,
            NamaJurusan: major,
        };
        const response = await fetch('http://localhost:3000/api/users/registerMajor', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(majorData),
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
                    <form onSubmit={handleRegisterMajor}>
                        <h2>Major Register</h2>
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
                    <div className="registerRoleInput">
                        <input
                        type="text"
                        value={major}
                        onChange={(e) => setMajor(e.target.value)}
                        required
                        />
                        <label htmlFor="major">Major Name</label>
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

export default RegisterMajor