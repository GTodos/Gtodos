import logo from './img/GTodos_Logo_text.svg';
import { Link } from 'react-router';


export default function Login() {
    return (
        
        <div className="flex flex-col absolute top-5/8 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-20 p-20 bg-main">

            <img className='w-40 absolute top-0/4 left-1/2 -translate-x-1/2 -translate-y-1/2 ' src={logo} alt="GTodos Logo" />
            
            <form className="flex flex-col items-center justify-center gap-4">
                <input className="bg-white border-main min-w-70 min-h-10" type="text" placeholder="Username" />
                <input className="bg-white border-main min-w-70 min-h-10" type="password" placeholder="Password" />
                <button className='min-w-70 min-h-10 bg-violet text-white' type="submit">Login</button>
            </form>
            <Link to="/signin">
                {' '}
                Don't have an account? Register now!
            </Link>

        </div>
    )
}