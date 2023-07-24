import { Box } from "@mui/system";
import React, { useEffect, useState, useRef } from "react";
import Map, {
  GeolocateControl,
  Marker,
  NavigationControl,
  useControl,
} from "react-map-gl";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import { USER_ADDRESS_MAP_CONFIRM } from "../constants/userConstants";
import { Button } from "@mui/material";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

const defaultLocation = { lat: -1.658501, lng: 29.2204548 };
const LocalisationScreen = () => {
  const navigate = useNavigate();
  const [mapKey, setMapKey] = useState("");
  const [viewport, setViewport] = useState({
    latitude: defaultLocation.lat,
    longitude: defaultLocation.lng,
  });

  const [places, setPlaces] = useState([]);

  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const placeRef = useRef(null);
  const dispatch = useDispatch();
  const [location, setLocation] = useState(defaultLocation);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios("/api/config/maplab");
      setMapKey(data);
      getUserCurrentLocation();
    };
    fetchData();
  }, []);

  const onLoad = (map) => {
    mapRef.current = map;
    mapboxgl.accessToken =
      "pk.eyJ1IjoidGVubnkyNDMiLCJhIjoiY2xocTM5Y2NsMmNseDNocXByY2d5dzUzdCJ9._IVYnfsvpqeCYDGFQ-xNxA";
  };

  const onMarkerLoad = (marker) => {
    markerRef.current = marker;
    marker.on("dragend", onPlaceChange); // Attache le gestionnaire d'événements dragend
  };

  const onViewportChange = (newViewport) => {
    setViewport(newViewport);
  };

  const onIdle = () => {
    if (viewport) {
      setLocation({
        lat: viewport.latitude,
        lng: viewport.longitude,
      });
    }
  };

  const getUserCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser");
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setViewport({
          ...viewport,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  };

  const onPlaceChange = () => {
    const marker = markerRef.current;
    if (marker) {
      const { lng, lat } = marker.getLngLat();
      const geocoder = placeRef.current;
      const placeName = geocoder?.inputEl.value || "";

      const newPlace = {
        name: placeName,
        coordinates: {
          lat: lat,
          lng: lng,
        },
      };

      setPlaces([...places, newPlace]);
    }
  };
  const GeocoderComponent = () => {
    const ctrl = new MapboxGeocoder({
      accessToken:
        "pk.eyJ1IjoidGVubnkyNDMiLCJhIjoiY2xocTM5Y2NsMmNseDNocXByY2d5dzUzdCJ9._IVYnfsvpqeCYDGFQ-xNxA",
      marker: true,
      mapboxgl: mapboxgl,
      collapsed: true,
    });

    useControl(() => ctrl);
    ctrl.on("result", (e) => {
      const coords = e.result.geometry.coordinates;
      setViewport({
        ...viewport,
        latitude: coords[1],
        longitude: coords[0],
      });
      setLocation({
        lat: coords[1],
        lng: coords[0],
      });
    });

    placeRef.current = ctrl;
    return null;
  };

  useEffect(() => {
    console.log(location);
    console.log(places);
  }, [location, places]);

  return (
    <>
      <Box sx={{ height: "80vh", position: "relative" }}>
        <Map
          ref={mapRef}
          mapboxAccessToken='pk.eyJ1IjoidGVubnkyNDMiLCJhIjoiY2xocTM5Y2NsMmNseDNocXByY2d5dzUzdCJ9._IVYnfsvpqeCYDGFQ-xNxA'
          initialViewState={{
            longitude: defaultLocation.lng,
            latitude: defaultLocation.lat,
            zoom: 8,
          }}
          mapStyle='mapbox://styles/mapbox/streets-v12'
          onLoad={onLoad}
          onViewportChange={onViewportChange}
          onIdle={onIdle}
        >
          <Marker
            longitude={defaultLocation.lng}
            latitude={defaultLocation.lat}
            draggable
            onLoad={onMarkerLoad}
            onDragEnd={onPlaceChange}
          />
          <NavigationControl position='bottom-right' />
          <GeolocateControl
            position='top-left'
            trackUserLocation
            onGeolocate={(e) =>
              setViewport({
                ...viewport,
                latitude: e.coords.longitude,
                longitude: e.coords.latitude,
              })
            }
          />
          <GeocoderComponent />
        </Map>
        <div>
          <h2>Places:</h2>
          <ul>
            {places.map((place, index) => (
              <li key={index}>
                <strong>Name:</strong> {place.name},
                <strong>Coordinates:</strong> {place.coordinates.lat},{" "}
                {place.coordinates.lng}
              </li>
            ))}
          </ul>
        </div>
      </Box>
    </>
  );
};

export default LocalisationScreen;
