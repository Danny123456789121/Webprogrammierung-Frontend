import Cookies from 'js-cookie'

const usePageViewTracker = (pizzaType) => {
    const token = Cookies.get('token')
    fetch('http://localhost:8080/visit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pizzaType, token }),
    })
}
export default usePageViewTracker
