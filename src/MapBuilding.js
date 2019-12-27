import React from 'react';
import { render } from 'react-dom'
import { Map, TileLayer, Marker } from "react-leaflet";

import './MapBuilding.css';


export default function MapBuilding (props) {
	const position = [52.092802, 5.1137246];
	const map = (
  		<Map center={position} zoom={19}>
  		  <TileLayer
  		    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  		    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
  		  />
  		  <Marker position={position}/>
  		</Map>
	);
	return (
		<div className="MapContainer">
			{map}
		</div>
	);
}
