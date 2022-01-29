import Axios from 'axios';
import Constant from '../util/Constant.js';

const routes = {
    login: '/user/login',
    verifyUser: '/user/verify'
}
// returns full url for endpoint
const getRoute = route => Constant.API_ENDPOINT + route;

const Get = async url => {
    console.log('ApiService calling GET ', url);
    let response = await Axios.get(url);
    return response ? response.data : null;
}

const Post = async (url, body, headers = {}) => {
    headers = {...headers, "Content-type": "application/json"};
    console.log('ApiService calling POST ', url, body, headers);
    let response = await Axios.post(url, body, { headers });
    return response ? response.data : null;
}

const ApiService = {
    login:  params => {
        let url = getRoute(routes.login);
        return Post(url, params);
    },
    verifyUser: token => {
        let url = `${ getRoute(routes.verifyUser) }/${ token }`;
        return Get(url);
    }
}

export default ApiService;
