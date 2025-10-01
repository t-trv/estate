import './layout.scss';
import Navbar from '../../components/navbar/Navbar';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

function Layout() {
    return (
        <div className="layout">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
}

function RequireAuthLayout() {
    const { currentUser } = useAuthContext();

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="layout">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
}

export { Layout, RequireAuthLayout };
