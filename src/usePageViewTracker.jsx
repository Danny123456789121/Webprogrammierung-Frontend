import Cookies from 'js-cookie';

const usePageViewTracker = (type) => {
    const token = Cookies.get('token')
    fetch('http://localhost:8080/visit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            page: type,
            token: token
        })
    });
};
export default usePageViewTracker;
