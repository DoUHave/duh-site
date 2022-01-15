/**
 * Config file, referencing some env vars and constants
 * @author dassiorleando
 */
const Constant = {
    API_ENDPOINT: process.env.REACT_APP_API_ENDPOINT,
    MESSAGE_ENDPOINT: process.env.REACT_APP_MESSAGE_ENDPOINT,
    SOCKET_ENDPOINT: process.env.REACT_APP_SOCKET_ENDPOINT,
    CAPTCHA_CLIENT_KEY: process.env.REACT_APP_CAPTCHA_CLIENT_KEY,
    NATIONWIDE_RADIUS: 3000
}

export default Constant;
