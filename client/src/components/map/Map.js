import { MapContainer, TileLayer } from 'react-leaflet';
import LeafletControlGeocoder from './LeafletControlGeocoder';

const Map = ({ positionInfos }) => {
    return (
        <MapContainer
            center={[21.037127596756793, 105.83465596700151]}
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
