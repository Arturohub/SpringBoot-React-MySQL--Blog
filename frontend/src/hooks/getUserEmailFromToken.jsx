import { jwtDecode } from "jwt-decode";

const getTokenFromCookie = () => {
    const cookieName = 'Arturo-token';
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith(cookieName))
        ?.split('=')[1];
    return cookieValue || null;
};

const getUserEmailFromToken = () => {
    const token = getTokenFromCookie();
    if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken.email || null;
    }
    return null;
};

export { getUserEmailFromToken };