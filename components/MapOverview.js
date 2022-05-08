
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useState } from 'react'
import { postMapData } from '../lib/api'


const MapOverview = () => {
  const [rows, setRows] = useState([])
  const data = postMapData().then(data => {
    const rows = data.rows
    setRows(data.rows)
  })
  console.log(rows)
  return (
    <MapContainer center={[6.524400, 3.379199]} zoom={3} scrollWheelZoom={true} style={{height: "100%", width: "100%"}}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        rows.map((row) => (
          <>
            <Marker position={[row.latitude_deg , row.longitude_deg]} style={""}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </>
        ))
      }
      
    </MapContainer>
  )
}

export default MapOverview