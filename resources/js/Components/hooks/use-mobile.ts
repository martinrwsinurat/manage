import { useEffect, useState } from "react";

export function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");

        // Set initial value
        setIsMobile(mediaQuery.matches);

        // Define callback
        const handleChange = (event: MediaQueryListEvent) => {
            setIsMobile(event.matches);
        };

        // Add listener
        mediaQuery.addEventListener("change", handleChange);

        // Cleanup
        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    return isMobile;
}
