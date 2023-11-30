import { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import LeafletControlGeocoder from './LeafletControlGeocoder';

const Map = ({ positionInfos }) => {
    // get the location from geolocation
    const [latLng, setLatLng] = useState({
        lat: 21.037127596756793,
        lng: 105.83465596700151,
        isLoaded: false,
    });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    setLatLng({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        isLoaded: true,
                    });
                },
                error => {
                    alert(error);
                }
            );
        }
    }, []);

    return (
        <MapContainer
            center={[latLng.lat, latLng.lng]}
            style={{ width: '100%', height: '400px' }}
            zoom={20}
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LeafletControlGeocoder address={positionInfos} />
        </MapContainer>
    );
};

export default Map;
