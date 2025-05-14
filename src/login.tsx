import { useState } from 'react';
import logo from './img/GTodos_Logo_text.svg';
import { Link } from 'react-router';
import { useNavigate } from 'react-router-dom';



export default function LoginComponent() {

    const [username, setUsername] = useState<string | undefined>("");
    const [password, setPassword] = useState<string | undefined>("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    function login() {
        if (username === undefined || password === undefined) {
            setError(true);
            return;
        }

        fetch('http://localhost:9001/users/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
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
                navigate('/todos');
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
                <input value={username} onKeyDown={(e) => {if (e.key === "Enter")login();}} onChange={e => setUsername(e.target.value)} className="bg-white border-main min-w-70 min-h-10 p-1 pl-2" type="text" placeholder="Username" />
                <input value={password} onKeyDown={(e) => {if (e.key === "Enter")login();}} onChange={e => setPassword(e.target.value)} className="bg-white border-main min-w-70 min-h-10 p-1 pl-2" type="password" placeholder="Password" />
                <button onClick={login} type='button' className='min-w-70 min-h-10 bg-violet text-white'>Login</button>
            </div>
            <Link to="/signup">
                {' '}
                Don't have an account? Register now!
            </Link>

            {error && <p className="text-red-500">Invalid username or password</p>}

        </div>
    )
}