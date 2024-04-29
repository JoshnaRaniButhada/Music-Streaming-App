import {useState} from "react";
// import { Icon } from '@iconify/react';
import TextInput from '../components/shared/TextInput';
import TuneBud_logo from "../assets/images/TuneBud_logo.png"
import PasswordInput from '../components/shared/PasswordInput';
import {Link, useNavigate} from 'react-router-dom';
import { makeUnauthenticatedPOSTRequest } from '../utils/serverHelpers';
import {useCookies} from "react-cookie";



const LoginComponent = ()=> {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cookie, setCookie] = useCookies(["token"]);
    const navigate = useNavigate();

    const login = async () => {
            const data = {email, password};
            const response = await makeUnauthenticatedPOSTRequest(
                "/auth/login",
                data
            );
    
            if(response && !response.err) {
    
                //Cookie setup
                const token = response.token;
                const date = new Date();
                date.setDate(date.getDate() + 30);
                setCookie("token", token, {path: "/", expires: date});
                
                
                navigate("/home");
            }else{
                alert("Failed to login");
            }
        };
    
        const token = cookie.token || ''; // Retrieve token from cookie
        console.log("Token from cookie:", token);

    return (
        <div className="w-full h-full flex flex-col items-center text-black" style={{ backgroundColor: '#14051E' }}>

            <div className="logo p-5 border-b border-solid border-gray-300 w-full flex justify-center">
                <img
                    src={TuneBud_logo}
                    alt="TuneBud logo"
                    width={125}
                />
            </div>

            {/* Text Inputs/placeholders */}
            <div className='inputRegion w-1/3 py-10 text-white flex items-center justify-center flex-col'>
                <div className='font-bold mb-5'>
                    To continue, log in to JoTunes.
                </div>
                <TextInput
                label="Email address or userName"
                placeholder="Email address or userName"
                className="my-6"
                value={email}
                setValue={setEmail}
                />

                <PasswordInput
                label="Password"
                placeholder="Password"
                style={{ color: 'black' }}
                value={password}
                setValue={setPassword}
                />

                <div className='w-full flex items-center justify-end my-8'>
                    <button className='bg-green-400 font-semibold p-3 px-10 rounded-full '
                        style={{ backgroundColor: '#907DB3' }}
                    onClick={(e) => {
                        e.preventDefault();
                        login();
                    }}
                    >
                        LOG IN
                    </button>
                </div>
                <div className='w-full border border-solid border-gray-300'></div>
                <div className='my-6 font-bold text-lg'>
                        Don't have an account?
                </div>
                <button className='w-full border text-white border-solid font-bold flex items-center justify-center py-3 rounded-full ' style={{ backgroundColor: '#907DB3' }}>
                        <Link to="/signup">SIGN UP FOR SPOTIFY</Link>
                </button>
            </div>
        </div>
    );
};


export default LoginComponent;




