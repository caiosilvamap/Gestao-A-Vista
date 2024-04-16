import { useState } from 'react';
import Alert from '@material-tailwind/react/components/Alert';
import { Navigate, useNavigate } from 'react-router-dom';
import Host, { Port } from '../../LinkAPI';
import Logo from '/src/images/logo/logoGTA10anos.png';
import BG from '/src/images/bg.jpg';
import "./login.css"
import dayjs from 'dayjs';
import { encryptData } from '../../components/componentsGTA/GTAKeep';
import { FullScreenQuad } from 'three-stdlib';
import { Opacity } from '@mui/icons-material';


const SignIn = () => {

    const [waiting, setWaiting] = useState<boolean>(false);
    const [authenticated, setAutenticated] = useState(false);
    const [userNameInput, setUserNameInput] = useState("");
    const [passwordInput, setPassword] = useState("");
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleSubmit = (event: { preventDefault: () => void; }) => {

        event.preventDefault();

        const loginData = {
            username: userNameInput,
            password: passwordInput
        };

        setWaiting(true);

        fetch(Host + Port + '/api/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    return response.json();

                } else if (response.status === 401) {
                    throw new Error('Unauthorized');

                } else {
                    throw new Error('Login failed');
                }
            })
            .then((data) => {
                localStorage.setItem('token', data.token);
                localStorage.setItem('name', (data.userName));
                localStorage.setItem('position', (data.position || ''));
                localStorage.setItem('selectedDateBegin', dayjs().toString());
                localStorage.setItem('selectedDateEnd', dayjs().toString());
                localStorage.setItem('S7si3CmkF6', data.profilePicture || '');
                localStorage.setItem('registration', data.registration || '');
                localStorage.setItem('userGroupId', data.userGroupId);
                localStorage.setItem('userId', data.userId);

                setAutenticated(true);

                const storedRoute = localStorage.getItem('storedRoute');
                navigate(storedRoute || '/', { replace: true });
            })
            .catch((error) => {
                if (error.message === 'Unauthorized') {
                    setError('Credenciais Inválidas');
                } else {
                    setError('Falha no Login');
                }
                console.error(error);
            })
            .finally(() => {
                setWaiting(false);
            })
    };


    document.body.addEventListener('loginForm', handleSubmit);

    if (authenticated) {
        return <Navigate to="/" replace />;
    } else {
        return (

            <div style={{
                position: 'relative',
                backgroundImage: `url(${BG})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }
            }>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',

                }}>
                </div>
                
                <div className="rounded-sm dark:border-strokedark d-flex justify-content-center" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    padding: '20px',
                    position: 'relative',
                    zIndex: 1
                }}>
                    <div className="flex flex-wrap items-center " >
                        <div className="bg-black bg-opacity-70 w-full mt-4 rounded-lg " style={{ maxWidth: '450px', boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px' }}>
                            <div className="w-full p-4 sm:p-12.5 xl:p-17.5 ">
                                <div className="" style={{
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}>

                                    <img className="mb-5" src={Logo} alt="Logo" />

                                </div>
                                <div >
                                    {error && (
                                        <div className="border px-4 py-3 rounded relative alert-danger" >
                                            <Alert >
                                                <span >
                                                    <strong className="font-bold" >Não autorizado:</strong> {error}
                                                </span>
                                            </Alert>
                                        </div>
                                    )}
                                </div>
                                <form onSubmit={handleSubmit} id="loginForm" name="loginForm">
                                    <div className="mt-2 mb-4">
                                        <label className="mb-2.5 block font-medium text-white light:text-black">
                                            Usuário
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="username"
                                                name="username"
                                                placeholder=""
                                                value={userNameInput}
                                                onChange={e => setUserNameInput(e.target.value)}
                                                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                required
                                            />

                                            <span className="absolute right-4 top-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label className="mb-2.5 block font-medium text-white light:text-black">
                                            Senha
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                value={passwordInput}
                                                onChange={e => setPassword(e.target.value)}
                                                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                required
                                            />

                                            <span className="absolute right-4 top-4">
                                                <svg
                                                    className="fill-current"
                                                    width="22"
                                                    height="22"
                                                    viewBox="0 0 22 22"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g opacity="0.5">
                                                        <path
                                                            d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                                                            fill=""
                                                        />
                                                        <path
                                                            d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                                                            fill=""
                                                        />
                                                    </g>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mb-5">
                                        <input
                                            type="submit"
                                            value="Entrar"
                                            className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                                        />
                                    </div>

                                </form>
                                {waiting ? <div className="flex justify-center">
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-primary border-t-transparent "></div>

                                </div>
                                    : <></>}

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }


};

export default SignIn;
