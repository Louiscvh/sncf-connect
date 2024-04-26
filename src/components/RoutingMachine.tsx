import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import { GeolocationPosition } from "../types/geolocationPosition.type.ts"
import {AddressType} from "../pages/landing.tsx";

export const createRoutineMachineLayer = ({userPosition, destination} : {
    userPosition: GeolocationPosition | null;
    destination: AddressType | null;
}) => {
    console.log(destination)
    const userIcon = new L.Icon({
        iconUrl: "https://cdn0.iconfinder.com/data/icons/4web-3/139/location-512.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });

    const waypoints = destination ?
        [L.latLng(userPosition?.lat, userPosition?.lng), L.latLng(destination.coords.y, destination.coords.x)] :
        [L.latLng(userPosition?.lat, userPosition?.lng)]

    const instance = L.Routing.control({
        waypoints,
        lineOptions: {
            styles: [{ color: "#8DE8FE", weight: 5 }]
        },
        altLineOptions: {
            styles: [{ color: "#6FA1EC", weight: 4, opacity: 0.5 }]
        },
        createMarker: (i: number, waypoint, n) => {
            if (i === 0 && userPosition) {
                return L.marker(waypoint.latLng, {
                    draggable: false,
                    icon: userIcon,
                    title: "Votre position",
                }).bindTooltip("Votre position",
                    {
                        permanent: true,
                        direction: 'top',
                        className: 'leaflet-tooltip-own'
                });
            } else {
                return L.marker(waypoint.latLng, {
                    draggable: true,
                    icon:userIcon,
                }).bindTooltip("Destination",
                    {
                        permanent: true,
                        direction: 'top',
                        className: 'leaflet-tooltip-own'
                });
            }
        },
        show: destination ? true : false,
        addWaypoints: false,
        routeWhileDragging: true,
        draggableWaypoints: true,
        fitSelectedRoutes: true,
        showAlternatives: true,
        language: "fr",
    });

    return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
