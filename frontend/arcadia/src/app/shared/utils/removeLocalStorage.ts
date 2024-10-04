export const removeLocalStorage = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
};
