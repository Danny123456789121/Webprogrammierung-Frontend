import { useEffect } from 'react';
import ReactGA from 'react-ga';

const usePageViewTracker = () => {
    useEffect(() => {
        ReactGA.initialize('GA_TRACKING_ID');
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);
};

export default usePageViewTracker;
