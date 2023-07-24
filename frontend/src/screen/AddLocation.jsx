import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { Box } from "@mui/system";
import axios from "axios";
import mapboxgl from "mapbox-gl";

import React, { useEffect, useRef, useState } from "react";
// import Map, { GeolocateControl, Marker, NavigationControl } from "react-map-gl";
import MapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateLocation } from "../actions/userActions";
import { USER_ADDRESS_MAP_CONFIRM } from "../constants/userConstants";

const libs = ["places"];
const defaultLocation = { lat: -1.658501, lng: 29.2204548 };

const AddLocation = () => {
  const navigate = useNavigate();
  const [mapKey, setMapKey] = useState("");
  const [viewport, setViewport] = useState({
    latitude: defaultLocation.lat,
    longitude: defaultLocation.lng,
    zoom: 8,
  });
  const dispatch = useDispatch();
  const [location, setLocation] = useState(defaultLocation);
  const mapRef = useRef(null);
  const placeRef = useRef(null);
  const markerRef = useRef(null);

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

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });

    const controlContainer = document.createElement("div");
    controlContainer.className = "geocoder-container";
    controlContainer.appendChild(geocoder.onAdd(map));

    const container = map.getContainer();
    container.appendChild(controlContainer);

    geocoder.on("result", onPlacesChanged);
  };

  const onMarkerLoad = (marker) => {
    markerRef.current = marker;
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

  const onPlacesChanged = () => {
    const places = placeRef.current.getPlaces();
    if (places && places.length > 0) {
      const place = places[0].geometry.location;
      setViewport({
        ...viewport,
        latitude: place.lat(),
        longitude: place.lng(),
      });
      setLocation({ lat: place.lat(), lng: place.lng() });
    }
  };

  const onConfirm = () => {
    const places = placeRef.current.getPlaces();
    if (places && places.length === 1) {
      const place = places[0];
      dispatch({
        type: USER_ADDRESS_MAP_CONFIRM,
        payload: {
          lat: location.lat,
          lng: location.lng,
          address: place.formatted_address,
          name: place.name,
          vicinity: place.vicinity,
          googleAddressId: place.id,
        },
      });
      alert("Location selected successfully.");
      navigate("/shipping");
    } else {
      alert("Please enter your address");
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

  return (
    <Box sx={{ height: "80vh", position: "relative" }}>
      <MapGL
        mapboxAccessToken='pk.eyJ1IjoidGVubnkyNDMiLCJhIjoiY2xocTM5Y2NsMmNseDNocXByY2d5dzUzdCJ9._IVYnfsvpqeCYDGFQ-xNxA'
        {...viewport}
        width='100%'
        height='100%'
        mapStyle='mapbox://styles/mapbox/streets-v11'
        onLoad={onLoad}
        onViewportChange={onViewportChange}
        onIdle={onIdle}
      >
        <Marker
          longitude={location.lng}
          latitude={location.lat}
          onLoad={onMarkerLoad}
          draggable
          onDragEnd={(e) => {
            if (e.lngLat) {
              dispatch({
                type: USER_ADDRESS_MAP_CONFIRM,
                payload: { lat: e.lngLat[1], lng: e.lngLat[0] },
              });
            }
          }}
        />
        <NavigationControl position='bottom-right' />
        <GeolocateControl
          position='top-left'
          trackUserLocation
          onGeolocate={(e) =>
            dispatch({
              type: USER_ADDRESS_MAP_CONFIRM,
              payload: { lng: e.coords.longitude, lat: e.coords.latitude },
            })
          }
        />
        <div ref={placeRef} className='geocoder-container' />
      </MapGL>
    </Box>
  );
};

export default AddLocation;
