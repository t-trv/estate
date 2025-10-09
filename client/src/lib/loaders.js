import apiRequest from './apiRequest';
import { defer } from 'react-router-dom';

export const singlePageLoader = async ({ request, params }) => {
    const res = await apiRequest.get(`/posts/${params.id}`);
    return res.data;
};

export const listPageLoader = async ({ request }) => {
    const query = request.url.split('?')[1];
    const postPromise = apiRequest.get('/posts?' + query);
    return defer({
        postResponse: postPromise,
    });
};
