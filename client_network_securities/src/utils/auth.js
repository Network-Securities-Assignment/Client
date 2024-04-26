export const isAuthenticated = () => {
    const userData = sessionStorage.getItem('userData');
    return Boolean(userData);
};
