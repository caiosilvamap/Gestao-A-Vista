import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Host, { Port } from "../../LinkAPI";

interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const preloader = document.getElementById('preloader');

    if (preloader) {
        setTimeout(() => {
            preloader.style.display = 'none';
            setLoading(false);
        }, 2000);
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        const formData = {
            TokenString: token
        };

        setTimeout(() => setLoading(false), 1000);

        fetch(Host + Port + '/api/Login/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then((response) => {
                if (response.status === 200) {
                    setAuthenticated(true);
                } else if (response.status === 401) {
                    throw new Error('Unauthorized');
                } else {
                    throw new Error('Login failed');
                }
            })
            .catch((error) => {
                if (error.message === 'Unauthorized' || error.message === 'Login failed') {
                    setAuthenticated(false);
                    localStorage.setItem('storedRoute', window.location.pathname);
                    navigate('/login');
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (authenticated) {
        return <>{children}</>;
    } else {
        return null;
    }
};

export default PrivateRoute;
