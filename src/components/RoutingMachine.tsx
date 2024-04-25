import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import { GeolocationPosition } from "../types/geolocationPosition.type.ts"

const createRoutineMachineLayer = ({userPosition, destination} : {
    userPosition: GeolocationPosition | null;
    destination: GeolocationPosition | null;
}) => {
    const waypoints = userPosition
        ? [L.latLng(userPosition.lat, userPosition.lng), L.latLng(48.88688122640208, 2.30876513558213)]
        : [L.latLng(48.68447885273276, 2.4095809850020347), L.latLng(48.88688122640208, 2.30876513558213)];

    const instance = L.Routing.control({
        waypoints,
        lineOptions: {
            styles: [{ color: "#6FA1EC", weight: 4 }]
        },
        altLineOptions: {
            styles: [{ color: "#6FA1EC", weight: 4, opacity: 0.5 }]
        },
        show: true,
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
