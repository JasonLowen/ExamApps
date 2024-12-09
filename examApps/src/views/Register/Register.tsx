import React from 'react'
import './Register.css'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const Register = () => {
    useEffect(() => {
        localStorage.removeItem('email');
        }, []);
  return (
    <section id='registerPage'>
        <div className="registerContainer">
            <div className="registerContent">
                <div className="registerTitle">
                    <h2>Register Options (Role)</h2>
                </div>
                <div className="registerOption">
                    <Link className="linkOption" to="/registerMajor">
                        <button>Major</button>
                    </Link>
                </div>
                <div className="registerOption">
                    <Link className="linkOption" to="/registerScheduling">
                        <button>Scheduling Team</button>
                    </Link>
                </div>
                <div className="registerOption">
                    <Link className="linkOption" to="/registerPIC">
                        <button>PIC</button>
                    </Link>
                </div>
                <div className="registerOption">
                    <Link className="linkOption" to="/registerPrinting">
                        <button>Printing Team</button>
                    </Link>
                </div>
                <div className="registerOption">
                    <Link className="linkOption" to="/registerAdministration">
                        <button>Administration Team</button>
                    </Link>
                </div>
                <div className="registerOption">
                    <Link className="linkOption" to="/registerExamSupervisor">
                        <button>Exam Supervisor</button>
                    </Link>
                </div>
                <div className="registerOption">
                    <Link className="linkOption" to="/registerStudent">
                        <button>Student</button>
                    </Link>
                </div>
                <div className="registerOption">
                    <Link className="linkOption" to="/registerLecturer">
                        <button>Lecturer</button>
                    </Link>
                </div>
                <Link to="/" className="backToLogin">Go back to Login</Link>
            </div>
        </div>
    </section>
  )
}

export default Register