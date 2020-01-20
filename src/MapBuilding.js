import React from 'react';
import { Map, TileLayer, Marker, FeatureGroup, Polygon } from "react-leaflet";

import './MapBuilding.css';

function getPolygonBounds (geoJSON) {
	// Note: does not work for polygons crossing the datetime border
	// (where xMax is less than xMin).
	const coordinates = geoJSON.coordinates[0];
	let xMin = coordinates[0][0];
	let xMax = coordinates[0][0];
	let yMin = coordinates[0][1];
	let yMax = coordinates[0][1];
	for (var i = 0; i < coordinates.length; i++) {
		if(coordinates[i][0] < xMin) {xMin = coordinates[i][0]};
		if(coordinates[i][0] > xMax) {xMax = coordinates[i][0]};
		if (coordinates[i][1] < yMin) {yMin = coordinates[i][1]};
		if (coordinates[i][1] > yMax) {yMax = coordinates[i][1]};
	}
	// console.log(xMin, xMax, yMin, yMax);
	// 5.558407963674824,5.55882798548451,52.02886037368467,52.02908930582589 // do we want this for the in_bbox parameter for the api?
	// 5.558407963674824,52.02886037368467,5.55882798548451,52.02908930582589 // do we want this for the in_bbox parameter for the api?
	// 52.02886037368467,5.558407963674824,52.02908930582589,5.55882798548451 // do we want this for the in_bbox parameter for the api?
	// 52.02886037368467,52.02908930582589,5.558407963674824,5.55882798548451 // do we want this for the in_bbox parameter for the api?
	return {xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax};
}

function getPolygonCenter (polygonBounds) {
	let xMean = (polygonBounds.xMin + polygonBounds.xMax) / 2;
	let yMean = (polygonBounds.yMin + polygonBounds.yMax) / 2;
	return {xMean: xMean, yMean: yMean};
}

export default function MapBuilding (props) {
    const { buildingGeoJSON, selectedAddress, waterLabelColor } = props;
    const polygonBounds = getPolygonBounds(buildingGeoJSON);
    const polygonCenter = getPolygonCenter(polygonBounds);
    const zoomLevel = 19; // zoomlevel 19 is the most zoomed in you still get a basemap
    let position = [polygonCenter.yMean, polygonCenter.xMean];
    let latlngs = [];

    if (buildingGeoJSON) {
        for (var i = 0; i < buildingGeoJSON.coordinates[0].length; i++) {
            let lat = buildingGeoJSON.coordinates[0][i][0];
            let lng = buildingGeoJSON.coordinates[0][i][1];
            latlngs.push([lng, lat]); // this order is right for Polygon of react-leaflet
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
