import { useNavigate } from 'react-router-dom';
import Chat from '../../components/chat/Chat';
import List from '../../components/list/List';
import apiRequest from '../../lib/apiRequest';
import './profilePage.scss';
import { useAuthContext } from '../../context/AuthContext';
import { randomAvatar } from '../../lib/randomAvatar';

function ProfilePage() {
    const navigate = useNavigate();

    const { updateUser, currentUser } = useAuthContext();

    const handleLogout = async () => {
        try {
            await apiRequest.post('/auth/logout');
            updateUser(null);
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        currentUser && (
            <div className="profilePage">
                <div className="details">
                    <div className="wrapper">
                        <div className="title">
                            <h1>User Information</h1>
                            <button onClick={() => navigate('/profile/update')}>
                                Update Profile
                            </button>
                        </div>
                        <div className="info">
                            <span>
                                Avatar:
                                <img
                                    src={currentUser.avatar || randomAvatar()}
                                    alt=""
                                />
                            </span>
                            <span>
                                Username: <b>{currentUser.username}</b>
                            </span>
                            <span>
                                E-mail: <b>{currentUser.email}</b>
                            </span>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                        <div className="title">
                            <h1>My List</h1>
                            <button>Create New Post</button>
                        </div>
                        <List />
                        <div className="title">
                            <h1>Saved List</h1>
                        </div>
                        <List />
                    </div>
                </div>
                <div className="chatContainer">
                    <div className="wrapper">
                        <Chat />
                    </div>
                </div>
            </div>
        )
    );
}

export default ProfilePage;
