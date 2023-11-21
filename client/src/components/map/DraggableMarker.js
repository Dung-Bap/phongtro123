import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';

const DraggableMarker = () => {
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setPosition({
                lat: latitude,
                lng: longitude,
            });
        });
    }, []);

    const [draggable, setDraggable] = useState(false);
    const [position, setPosition] = useState({
        // lat: 10.818129290560687,
        // lng: 106.61590122315759,
        lat: '',
        lng: '',
    });
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                if (marker != null) {
                    setPosition(marker.getLatLng());
                }
            },
        }),
        []
    );
    const toggleDraggable = useCallback(() => {
        setDraggable(d => !d);
    }, []);

    return (
        <Marker draggable={draggable} eventHandlers={eventHandlers} position={position} ref={markerRef}>
            <Popup minWidth={90}>
                <span onClick={toggleDraggable}>
                    {draggable ? 'Marker is draggable' : 'Click here to make marker draggable'}
                </span>
            </Popup>
        </Marker>
    );
};

export default DraggableMarker;
