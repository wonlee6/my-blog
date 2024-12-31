import React from "react";

type IntersectHandler = (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver
) => void;

const useIntersectionObserver = (
    onIntersect: IntersectHandler,
    options?: IntersectionObserverInit
) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const callback = React.useCallback(
        (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) onIntersect(entry, observer);
            });
        },
        [onIntersect]
    );

    React.useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver(callback, options);
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [ref, options, callback]);

    return ref;
};

export default useIntersectionObserver;