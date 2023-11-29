import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

// shape of the props
// {
//  positionInfos: [{address: "some address"}]
// }

export default function LeafletControlGeocoder(props) {
    const map = useMap();
    const { positionInfos } = props;
    const iconMarker = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/9356/9356230.png',
        // shadowUrl: 'leaf-shadow.png',

        iconSize: [38, 38], // size of the icon
        shadowSize: [50, 64], // size of the shadow
        iconAnchor: [22, 40], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62], // the same for the shadow
        popupAnchor: [-2, -30], // point from which the popup should open relative to the iconAnchor
    });

    useEffect(() => {
        // creaet Geocoder nominatim
        var geocoder = L.Control.Geocoder.nominatim();
        // for every positionInfo
        // get the geocordinates of the address in the positionInfo
        // use the latitude and longitude to create a marker
        // and add it the map
        // eslint-disable-next-line array-callback-return
        positionInfos.map(positionInfo => {
            const address = positionInfo.address;
            if (address) {
                geocoder.geocode(address, resultArray => {
                    if (resultArray.length > 0) {
                        const result = resultArray[0];
                        const latlng = result.center;
                        L.marker(latlng, { icon: iconMarker }).addTo(map).bindPopup(result.name);
                        map.fitBounds(result.bbox);
                    }
                });
            }
        });
    }, [iconMarker, map, positionInfos]);

    return null;
}
