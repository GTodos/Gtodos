import { Link, useNavigate } from 'react-router-dom';
import logo from './img/GTodos_Logo_text.svg';
import { useState } from 'react';

export default function Signup() {

    const [username, setUsername] = useState<string | undefined>("");
    const [password, setPassword] = useState<string | undefined>("");
    const [password2, setPassword2] = useState<string | undefined>("");
    const [email, setEmail] = useState<string | undefined>("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const navigate = useNavigate();

    function signup() {
        if (username === undefined || password === undefined || password2 === undefined || email === undefined) {
            setError(true);
            return;
        }

        if (password !== password2) {
            setError(true);
            setErrorMessage("Passwords do not match");
            return;
        }

        fetch('http://localhost:9001/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, email }),
        })
            .then(response => {
                if (!response.ok) {
                    setError(true);
                    return;
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                const { token } = data;
                localStorage.setItem('authToken', token);
                navigate('/login');
                // Handle successful login here
            })
            .catch(error => {
                console.error('Error:', error);
                setError(true);
            });
    }
    


    return (
        <div className="flex flex-col absolute top-5/8 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-20 p-20 bg-main">

            <img className='w-40 absolute top-0/4 left-1/2 -translate-x-1/2 -translate-y-1/2 ' src={logo} alt="GTodos Logo" />
            
            <div className="flex flex-col items-center justify-center gap-4">
                <input onKeyDown={(e) => {if (e.key === "Enter")signup();}} onChange={e => setUsername(e.target.value)} className="bg-white border-main min-w-70 min-h-10" type="text" placeholder="Username" />
                <input onKeyDown={(e) => {if (e.key === "Enter")signup();}} onChange={e => setPassword(e.target.value)} className="bg-white border-main min-w-70 min-h-10" type="password" placeholder="Password" />
                <input onKeyDown={(e) => {if (e.key === "Enter")signup();}} onChange={e => setPassword2(e.target.value)} className="bg-white border-main min-w-70 min-h-10" type="password" placeholder="Repeat Password" />
                <input onKeyDown={(e) => {if (e.key === "Enter")signup();}} onChange={e => setEmail(e.target.value)} className="bg-white border-main min-w-70 min-h-10" type="email" placeholder="E-Mail" />
                <button onClick={signup} className='min-w-70 min-h-10 bg-violet text-white'>Register</button>
            </div>

            <p>
                <Link to="/login">
                    {' '}
                    Already have an account? Login!
                </Link>
                {error && <div className="text-red-500">Please type in valid information</div>}
                {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            </p>

        </div>
    )
}