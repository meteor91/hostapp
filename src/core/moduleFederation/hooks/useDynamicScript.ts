import React from 'react';
const urlCache = new Set();

export const useDynamicScript = (url: string): {
    ready: boolean
    failed: boolean
} => {
    const [ready, setReady] = React.useState(false);
    const [failed, setFailed] = React.useState(false);

    React.useEffect(() => {
        if (!url) {
            return;
        }

        if (urlCache.has(url)) {
            setReady(true);
            setFailed(false);
            return;
        }

        setReady(false);
        setFailed(false);

        const element = document.createElement('script');

        element.src = url;
        element.type = 'text/javascript';
        element.async = true;

        element.onload = () => {
            urlCache.add(url);
            setReady(true);
        };

        element.onerror = () => {
            setReady(false);
            setFailed(true);
        };

        document.head.appendChild(element);

        return () => {
            urlCache.delete(url);
            document.head.removeChild(element);
        };
    }, [url]);

    return {
        failed,
        ready,
    };
};
