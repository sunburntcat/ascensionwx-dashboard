import { useState, useRef, useEffect } from "react"
import mapboxgl from "mapbox-gl"
import Head from "next/head"


mapboxgl.accessToken = "pk.eyJ1IjoiYm03IiwiYSI6ImNsMnZhMzZlZTA5djkzanBoaGRrMWxqcXIifQ.QBbiF7NE0j389I6rIV0Dmg"

export default function MapOverview(props) {

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(8);

    console.log(mapboxgl.accessToken)
    

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [lng, lat],
          zoom: zoom
        });
      });
    
    return (
      <div ref={mapContainer} className="" />
    )
}
