import MapBoxGeocoder from "@mapbox/mapbox-gl-geocoder";
import axios from "axios";
import { useEffect, useState } from "react";
import { useControl } from "react-map-gl";
import { useDispatch } from "react-redux";
import { UPDATE_LOCATION } from "../constants/userConstants";
import { useValue } from "../store";

const Geocoder = () => {
  const [REACT_APP_MAPBOX_ACCESS_TOKEN, setGoogleApiKey] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios("/api/config/maplab");
      setGoogleApiKey(data);
    };
    fetch();
  }, []);
  const dispatch = useValue();
  const ctrl = new MapBoxGeocoder({
    accessToken:
      "pk.eyJ1IjoidGVubnkyNDMiLCJhIjoiY2xocTM5Y2NsMmNseDNocXByY2d5dzUzdCJ9._IVYnfsvpqeCYDGFQ-xNxA",
    marker: false,
    collapsed: true,
  });
  useControl(() => ctrl);
  ctrl.on("result", (e) => {
    const coords = e.result.geometry.coordinates;
    dispatch({
      type: UPDATE_LOCATION,
      payload: { lng: coords[0], lat: coords[1] },
    });
  });
};

export default Geocoder;
