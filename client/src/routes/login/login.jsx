import { useState } from 'react';
import './login.scss';
import { Link, useNavigate } from 'react-router-dom';
import apiRequest from '../../lib/apiRequest';
import { useAuthContext } from '../../context/AuthContext';

function Login() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { updateUser } = useAuthContext();

    const navigate = useNavigate();

    const handleSubmit = async e => {
        setError('');
        setIsLoading(true);
        e.preventDefault();
        const formData = new FormData(e.target);

        const username = formData.get('username');
        const password = formData.get('password');

        try {
            const res = await apiRequest.post('/auth/login', {
                username,
                password,
            });

            updateUser(res.data);
            navigate('/');
        } catch (err) {
            console.log(err);
            setError(err.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login">
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <h1>Welcome back</h1>
                    <input
                        name="username"
                        required
                        type="text"
                        placeholder="Username"
                    />
                    <input
                        name="password"
                        required
                        type="password"
                        placeholder="Password"
                    />
                    <button disabled={isLoading}>Login</button>
                    {error && <span>{error}</span>}
                    <Link to="/register">{"Don't"} you have an account?</Link>
                </form>
            </div>
            <div className="imgContainer">
                <img src="/bg.png" alt="" />
            </div>
        </div>
    );
}

export default Login;
