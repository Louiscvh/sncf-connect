import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import RoutineMachine from "./RoutingMachine.tsx";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { GeolocationPosition } from "../types/geolocationPosition.type.ts";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import {AddressType} from "../pages/landing.tsx"; // Importez le fichier CSS de leaflet-routing-machine

export const Map = ({selectedAddress}: {selectedAddress: AddressType | null}) => {
    const [locationStatus, setLocationStatus] = useState<string>('loading');
    const [position, setPosition] = useState<GeolocationPosition | null>(null);
    const [destination, setDestination] = useState<AddressType | null>(selectedAddress); // Set initial destination based on selectedAddress
    useEffect(() => {
        let watchId: number | null = null;
        if ('geolocation' in navigator) {
            watchId = navigator.geolocation.watchPosition(
                (position) => {
                    setPosition({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                    setLocationStatus('accessed');
                },
                (error) => {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            setLocationStatus('denied');
                            break;
                        case error.POSITION_UNAVAILABLE:
                            setLocationStatus('unknown');
                            break;
                        case error.TIMEOUT:
                            setLocationStatus('error');
                            break;
                        default:
                            setLocationStatus('error');
                            break;
                    }
                }
            );
            return () => {
                if (watchId) {
                    navigator.geolocation.clearWatch(watchId);
                }
            };
        }
        setLocationStatus('denied');
        console.log("rerender Map.tsx");
    }, [selectedAddress]);

    return (
         position ? <MapContainer
            doubleClickZoom={false}
            id="mapId"
            zoom={15}
            center={[position?.lat, position?.lng]}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
            />
                <RoutineMachine userPosition={position} destination={destination}/>
            </MapContainer> : <div className="h-screen w-screen bg-gray-500 animate-pulse"></div>
    );
};
