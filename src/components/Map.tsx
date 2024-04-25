import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import RoutineMachine from "./RoutingMachine.tsx";
import "leaflet/dist/leaflet.css";
import { GeolocationPosition } from "../types/geolocationPosition.type.ts";

export const Map = ({selectedAdress}: {selectedAdress: string}) => {

    const [locationStatus, setLocationStatus] = useState<string>('loading');
    const [position, setPosition] = useState<GeolocationPosition | null>(null);

    useEffect(() => {
        let watchId: number | null = null;
        if ('geolocation' in navigator) {
            watchId = navigator.geolocation.watchPosition(
                (position) => {
                    setPosition({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
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
    }, []);

    return (
         position ? <MapContainer
            doubleClickZoom={false}
            id="mapId"
            zoom={30}
            center={[33.5024, 36.2988]}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
            />
                <RoutineMachine userPosition={position} destination={selectedAdress}/>
            </MapContainer> : <div className="h-screen w-screen bg-gray-500 animate-pulse"></div>
    );
};
