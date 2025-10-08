import { useState } from 'react';
import './navbar.scss';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { randomAvatar } from '../../lib/randomAvatar';

function Navbar() {
    const [open, setOpen] = useState(false);
    const { currentUser } = useAuthContext();

    return (
        <nav>
            <div className="left">
                <a href="/" className="logo">
                    <img src="/logo.png" alt="" />
                    <span>LamaEstate</span>
                </a>
                <a href="/">Home</a>
                <a href="/">About</a>
                <a href="/">Contact</a>
                <a href="/">Agents</a>
            </div>
            <div className="right">
                {currentUser ? (
                    <div className="user">
                        <img
                            src={currentUser.avatar || randomAvatar()}
                            alt=""
                        />
                        <span>{currentUser.username}</span>
                        <Link to="/profile" className="profile">
                            <div className="notification">3</div>
                            <span>Profile</span>
                        </Link>
                    </div>
                ) : (
                    <>
                        <a href="/login">Sign in</a>
                        <a href="/register" className="register-btn">
                            Sign up
                        </a>
                    </>
                )}

                {/* Navbar for mobile */}
                <div className="menuIcon">
                    <img
                        src="/menu.png"
                        alt=""
                        onClick={() => setOpen(prev => !prev)}
                    />
                </div>
                <div className={open ? 'menu active' : 'menu'}>
                    <a href="/">Home</a>
                    <a href="/">About</a>
                    <a href="/">Contact</a>
                    <a href="/">Agents</a>
                    <a href="/">Sign in</a>
                    <a href="/">Sign up</a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
