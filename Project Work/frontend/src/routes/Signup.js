// import { Icon } from '@iconify/react';
import {useCookies} from 'react-cookie'
import { useState } from 'react';
import TextInput from '../components/shared/TextInput';
import TuneBud_logo from "../assets/images/TuneBud_logo.png"
import PasswordInput from '../components/shared/PasswordInput';
import {Link, useNavigate} from 'react-router-dom';
import { makeUnauthenticatedPOSTRequest } from '../utils/serverHelpers';


const SignUpComponent = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setuserName] = useState("");
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");

    const [cookie, setCookie] = useCookies(["token"]);

    const navigate = useNavigate();


    const signUp = async () => {
        if(email !== confirmEmail) {
            alert("Email doesn't match!");
            return;
        }
        const data = {firstName, lastName, userName, email, password};
        const response = await makeUnauthenticatedPOSTRequest(
            "/auth/register",
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
            alert("Failed to signup");
        }
    };

    const token = cookie.token || ''; // Retrieve token from cookie
    console.log("Token from cookie:", token);
    
    return (
        <div className="w-full min-h-screen flex flex-col items-center" style={{ backgroundColor: '#14051E' }}>
            <div className="logo p-2 border-b border-solid border-gray-300 w-full flex justify-center">
            <img
                    src={TuneBud_logo}
                    alt="TuneBud"
                    width={180}
                    
                />
            </div>

            {/* Text Inputs/placeholders */}
            <div className='inputRegion text-white w-1/3 py-10 flex items-center justify-center flex-col'>
                <div className='font-bold mb-5 text-3xl'>
                Sign up to start listening
                </div>

                
                <div className='w-full flex justify-between items-center space-x-7'>
                    <TextInput
                        label="First Name"
                        placeholder="Enter your first name."
                        className="mb-6"
                        value={firstName}
                        setValue={setFirstName}
                    />
                    <TextInput
                        label="Last Name"
                        placeholder="Enter your last name."
                        className="mb-6"
                        value={lastName}
                        setValue={setLastName}
                    />
                </div>

                <TextInput
                    label="username"
                    placeholder="Enter your username"
                    className="mb-6"
                    value={userName}
                    setValue={setuserName}
                />

                <TextInput
                    label="Email address"
                    placeholder="domain@gmail.com."
                    className="my-6"
                    value={email}
                    setValue={setEmail}
                />
                <TextInput
                    label="Confirm Email Address"
                    placeholder="Confirm Email Address."
                    className="mb-6"
                    value={confirmEmail}
                    setValue={setConfirmEmail}
                />

                <PasswordInput
                    label="Create Password"
                    placeholder="Enter a strong password."
                    value={password}
                    setValue={setPassword}
                />


                <div className='w-full flex items-center justify-center my-8' >
                <button
                        className="font-semibold p-3 px-10 rounded-full"
                        style={{ backgroundColor: '#907DB3' }}
                        onClick={(e) => {
                            e.preventDefault();
                            signUp();
                        }}
                    >
                        Sign Up
                    </button>
                </div>
                {/* <div className='w-full border border-solid border-gray-300'></div> */}
                <div className='my-6 font-bold text-lg'>
                        Already have an account?
                </div>
                <button className='w-full border border-gray-500 border-solid font-bold flex items-center justify-center py-3 rounded-full ' style={{ backgroundColor: '#907DB3' }}>
                <Link to="/login">LOG IN</Link>
                </button>
            </div>
        </div>
    );
};


export default SignUpComponent;



