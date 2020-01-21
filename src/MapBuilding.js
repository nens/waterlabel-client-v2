import React from 'react';
import { Map, TileLayer, Marker, FeatureGroup, Polygon } from "react-leaflet";

import {getPolygonBounds, getPolygonCenter} from './utils/polygonFunctions';
import './MapBuilding.css';

export default function MapBuilding (props) {
  const { buildingGeoJSON, selectedAddress, waterLabelColor } = props;
  const polygonBounds = getPolygonBounds(buildingGeoJSON);
  const polygonCenter = getPolygonCenter(polygonBounds);
  // zoomlevel 19 is the most zoomed in where you still get a basemap
  const zoomLevel = 19;
  let position = [polygonCenter.yMean, polygonCenter.xMean];
  let latlngs = [];

  if (buildingGeoJSON) {
    for (var i = 0; i < buildingGeoJSON.coordinates[0].length; i++) {
      // GeoJSON has longitude first
      let lng = buildingGeoJSON.coordinates[0][i][0];
      let lat = buildingGeoJSON.coordinates[0][i][1];
      // Polygon of react-leaflet has latitude first
      latlngs.push([lat, lng]);
    }
  }

  const map = (
    <Map
      center={position}
      zoom={zoomLevel}
      zoomControl={false} // removes +/- zoomcontrol on the map
      doubleClickZoom={false}
      closePopupOnClick={false}
      dragging={false}
      zoomSnap={false}
      zoomDelta={false}
      trackResize={false}
      touchZoom={false}
      scrollWheelZoom={false}
      draggable={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      <FeatureGroup>
        <Polygon
          positions={latlngs}
          color={waterLabelColor}
        />
      </FeatureGroup>
    </Map>
  );

  return (
    <div className="MapContainer">
      {map}
    </div>
  );
}
