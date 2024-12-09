import { useEffect } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
        const loginData = {
            Email: email,
            Password: password,
        };
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const result = await response.json();
      console.log('result = ' + result);
      if(response.status == 200){
        localStorage.setItem('email', email);
        localStorage.setItem('namaRole', result);
        if(result == "Mahasiswa"){
            window.location.href = "/homeStudent";
        }
        else if(result == "Dosen"){
            window.location.href = "/homeLecturer";
        }
        else if(result == "Jurusan"){
            window.location.href = "/homeMajor";
        }
        else if(result == "Penjadwalan"){
            window.location.href = "/homeScheduling";
        }
        else if(result == "PIC"){
            window.location.href = "/homePIC";
        }
        else if(result == "Percetakan"){
            window.location.href = "/homePrinting";
        }
        else if(result == "Administrasi"){
            window.location.href = "/homeAdministrasi";
        }
        else if(result == "Pengawas"){
            window.location.href = "/homeSupervisor";
        }
      }
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    localStorage.removeItem('email');
    localStorage.removeItem('namaRole');
    }, []);

  return (
    <section id='loginPage'>
        <div className="loginContainer">
            <div className="loginContent">
                <form onSubmit={handleLogin}>
                    <h2>Login</h2>
                    <div className="loginInput">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="loginInput">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button type='submit'>Log in</button>
                    <div className="register">
                        <p>Don't have an account? <Link to="/register">Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    </section>
  )
}

export default Login