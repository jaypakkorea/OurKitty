import { useState, useEffect } from 'react';

interface locationType {
    coords?: { lat: number, lng: number };
    error?: { code: number, message: string };
}

const useGeolocation = () => {
    const [location, setLocation] = useState<locationType>()

    // Success
    const onSuccess = (location: { coords: { latitude: number; longitude: number; }; }) => {
        setLocation({
            coords: {
                lat: location.coords.latitude,
                lng: location.coords.longitude
            }
        });
    };

    // Error
    const onError = (error: { code: number; message: string; }) => {
        setLocation({
            error,
        });
    }

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "위치 정보가 없습니다.",
            });
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);

    return location;
}

export default useGeolocation;