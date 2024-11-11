import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './style.css';

function Earthquake() {
  const [earthquakes, setEarthquakes] = useState([]);

  useEffect(() => {
    const fetchEarthquakeData = async () => {
      try {
        const response = await axios.get(
          'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'
        );
        setEarthquakes(response.data.features);
        console.log('earth data', response.data.features)
      } catch (error) {
        console.error("Error fetching earthquake data:", error);
      }
    };
    fetchEarthquakeData();
  }, []);

  return (
    <div className="earth-container">
      <h1>Recent Earthquake Activity</h1>
      <MapContainer center={[20, 0]} zoom={2} className="leaflet-container">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {earthquakes.map((quake) => (
          <CircleMarker
            key={quake.id}
            center={[
              quake.geometry.coordinates[1],
              quake.geometry.coordinates[0],
            ]}
            radius={Math.sqrt(quake.properties.mag) * 3}  // Scale marker size by magnitude
            color="red"
          >
            <Popup>
              <strong>Location:</strong> {quake.properties.place} <br />
              <strong>Magnitude:</strong> {quake.properties.mag} <br />
              <strong>Time:</strong> {new Date(quake.properties.time).toLocaleString()}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
      <footer>
        Data sourced from <a href="https://earthquake.usgs.gov">USGS Earthquake API</a>
      </footer>
    </div>
  );
}

export default Earthquake;
