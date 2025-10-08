import { useAuthContext } from '../../context/AuthContext';
import { randomAvatar } from '../../lib/randomAvatar';
import './profileUpdatePage.scss';
import apiRequest from '../../lib/apiRequest';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import UploadWidget from '../../components/uploadWidget/uploadWidget';

function ProfileUpdatePage() {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { currentUser, updateUser } = useAuthContext();
    const [avatar, setAvatar] = useState([]);

    console.log(avatar);

    // set up cloudinary react widget
    const cloudName = 'dejjk78pl';
    const uploadPreset = 'estate';
    const [publicId, setPublicId] = useState('');
    const uwConfig = {
        cloudName,
        uploadPreset,
        // Uncomment and modify as needed:
        // cropping: true,
        // showAdvancedOptions: true,
        // sources: ['local', 'url'],
        multiple: false,
        folder: 'avatars',
        maxFileSize: 2000000,
        // tags: ['users', 'profile'],
        // context: { alt: 'user_uploaded' },
        // clientAllowedFormats: ['images'],
        // maxImageFileSize: 2000000,
        // maxImageWidth: 2000,
        // theme: 'purple',
    };

    // ================================

    const navigate = useNavigate();

    const handleSubmit = async e => {
        setError('');
        setIsLoading(true);
        e.preventDefault();

        const formData = new FormData(e.target);

        const { username, email, password } = Object.fromEntries(formData);

        try {
            const res = await apiRequest.put(`/users/${currentUser.id}`, {
                username,
                email,
                password,
                avatar: avatar[avatar.length - 1],
            });

            updateUser(res.data);
            toast.success('Profile updated successfully');
            navigate('/profile');
        } catch (error) {
            console.log(error);
            setError(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="profileUpdatePage">
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <h1>Update Profile</h1>
                    <div className="item">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            name="username"
                            required
                            type="text"
                            defaultValue={currentUser.username}
                        />
                    </div>
                    <div className="item">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            required
                            type="email"
                            defaultValue={currentUser.email}
                        />
                    </div>
                    <div className="item">
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" />
                    </div>
                    <button disabled={isLoading}>Update</button>
                    {error && <span>{error}</span>}
                </form>
            </div>
            <div className="sideContainer">
                <img
                    src={
                        avatar[avatar.length - 1] ||
                        currentUser.avatar ||
                        randomAvatar()
                    }
                    alt=""
                    className="avatar"
                />

                <UploadWidget
                    uwConfig={uwConfig}
                    setPublicId={setPublicId}
                    setState={setAvatar}
                />

                {publicId && (
                    <div
                        className="image-preview"
                        style={{ width: '800px', margin: '20px auto' }}
                    ></div>
                )}
            </div>
        </div>
    );
}

export default ProfileUpdatePage;
