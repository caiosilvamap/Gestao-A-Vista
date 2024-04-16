import { useEffect, useState } from 'react';
import SignIn from './pages/Authentication/SignIn';
import { Route, Routes } from 'react-router';
import PrivateRoute from './components/PrivateRoutes/PrivateRoutes';
import Document from './pages/Common/Document/Document'
import User from './pages/Administration/User/User';
import AllDocuments from './pages/Administration/AllDocuments/AllDocuments';
import DefaultLayout from './layout/DefaultLayout';
import Home from './pages/Home/Home';
import Configurations from './pages/Administration/Configurations/Configurations';




function App() {
    const [loading, setLoading] = useState<boolean>(true);

    const preloader = document.getElementById('preloader');

    const token = localStorage.getItem('token');

    if (preloader) {
        setTimeout(() => {
            preloader.style.display = 'none';
            setLoading(false);
        }, 2000);
    }

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);


    return loading ? (
        <p className=" text-center text-danger">Failed to lead app</p>
    ) : (
        <Routes>

            <Route path="/login" element={<SignIn />} />

            <Route
                path="/*"
                element={
                    <DefaultLayout>
                        <PrivateRoute>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/document" element={<Document />} />
                                <Route path="/administration" element={<AllDocuments />} />
                                <Route path="/users" element={<User />} />
                                <Route path="/config" element={<Configurations/>} /> 
                            </Routes>
                        </PrivateRoute>
                    </DefaultLayout>
                }
            />
        </Routes>
    );
}

export default App;
