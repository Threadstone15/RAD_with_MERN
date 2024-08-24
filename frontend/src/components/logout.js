export const handleLogout = () => {
    // Clear all local storage data
    localStorage.clear();

    window.location.href = '/';
};