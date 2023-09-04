import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useAppNavigationManager = (appBasename: string) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Listen to navigation events dispatched inside app2 mfe.
    useEffect(() => {
        const appNavigationEventHandler = (event: Event) => {
            console.log(event);
            const pathname = (event as CustomEvent<string>).detail;
            const newPathname = `${appBasename}${pathname}`;
            if (newPathname === location.pathname) {
                return;
            }
            navigate(newPathname);
        };
        window.addEventListener(`[${appBasename}] navigated`, appNavigationEventHandler);
        console.log(`[${appBasename}] navigated`);
        return () => {
            window.removeEventListener(
                `[${appBasename}] navigated`,
                appNavigationEventHandler,
            );
        };
    }, [location, appBasename]);

    // Listen for shell location changes and dispatch a notification.
    useEffect(
        () => {
            if (location.pathname.startsWith(appBasename)) {
                window.dispatchEvent(
                    new CustomEvent('[shell] navigated', {
                        detail: location.pathname.replace(appBasename, ''),
                    }),
                );
            }
        },
        [location, appBasename],
    );
};