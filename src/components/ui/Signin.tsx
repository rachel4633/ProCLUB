import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/signin.css';

const Signin = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    const handlesubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setLoading("Please bear with us while we finalize your login.");

        try {
            const data = new FormData();
            data.append("email", email);
            data.append("password", password);

            const response = await axios.post("https://nkiroterakel.alwaysdata.net/api/signin", data);

            setLoading("");

            if (response.data.user) {
                localStorage.setItem("user", JSON.stringify(response.data.user));
    // save github username if it exists in the response
                if (response.data.user.github) {
                    localStorage.setItem('github_username', response.data.user.github);
                }
                setSuccess("Login Successful. Welcome! 🎉");
                setTimeout(() => navigate("/"), 2000);
             }
             else {
                setError("Login failed. Please try again!");
            }
        } catch (error) {
            setLoading("");
            setError("We have a problem. Try again!");
        }
    }

    return (
        <div className='signin-container'>
            <div className="signin-card">
               <h1>Welcome Back</h1>

                <h5>{loading}</h5>
                <h3>{success}</h3>
                <h4>{error}</h4>

                <form onSubmit={handlesubmit}>
                    <input type="email"
                        placeholder='✉️Enter the email'
                        className='form-input'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} /> <br />

                    <input type="password"
                        placeholder='🔒Enter your password'
                        className='form-input'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} /> <br />

                    <input type="submit" value="Signin" className='add-btn' />

                    <p className='sentence'>Create an account if you don't have one <br />
                        <Link to={'/signup'}>Register</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signin;