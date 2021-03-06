import React, { useState, useEffect } from 'react';
import { Map, TileLayer, FeatureGroup, Polygon } from "react-leaflet";

import {
	getPolygonBounds, getPolygonCenter, createBbox
} from './utils/geomFunctions';
import './MapBuilding.css';

export default function MapBuilding (props) {
  const { buildingGeoJSON, waterLabelColor, selectedAddress, LABELS } = props;
  const polygonBounds = getPolygonBounds(buildingGeoJSON);
  const polygonCenter = getPolygonCenter(polygonBounds);
  // Zoomlevel 19 is the most zoomed in where you still get a basemap
  const zoomLevel = 18;
  let position = [polygonCenter.yMean, polygonCenter.xMean];
  // Returning the getBounds of a react-leaflet map is quite complicated,
  // so I went for an easier solution: substracting and adding from the
  // x and y of the center of the map to get the bounding box for
  // the api call for the surrounding buildings.
  const bbox = createBbox(polygonCenter.xMean, 0.0012, polygonCenter.yMean, 0.0005);
  let latlngs = [];
  const [buildingCoordsAndLabels, setBuildingCoordsAndLabels] = useState([]);

  for (var i = 0; i < buildingGeoJSON.coordinates[0].length; i++) {
    // GeoJSON has longitude first
    let lng = buildingGeoJSON.coordinates[0][i][0];
    let lat = buildingGeoJSON.coordinates[0][i][1];
    // Polygon of react-leaflet has latitude first
    latlngs.push([lat, lng]);
  }

  useEffect(() => {
    fetch(
      `/api/v2/buildings/?in_bbox=${bbox}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then(function(response) {
      if (response.status !== 200) {
        throw new Error("building get status not 200: " + response.status);
      }
      return response.json();
    })
    .then(function(parsedJSON) {
      // A maximum of a 100 results will be given back by the api.
      let buildingCoordsAndLabels = parsedJSON.results.map((building) => {
        let invertedCoords = building.geometry.coordinates[0].map((coord) => {
          // GeoJSON has longitude first
          let lng = coord[0];
          let lat = coord[1];
          // Polygon of react-leaflet has latitude first
          return ([lat, lng]);
        });
        // If the selected building id is the same as the building id of a
        // surrounding building, make the selected building of the surrounding
        // buildings transparent. To prevent from the selected building being
        // drawn twice.
        if (selectedAddress.building === building.id) {
          // Make the selected building transparent in the surrounding buildings
          return ({ coords: invertedCoords, color: "rgba(0, 0, 0, 0" });
        } else {
          let waterlabel = LABELS.G.code;  // Default and worst label
          if (building.waterlabels.length !== 0) {
            waterlabel = building.waterlabels.slice(-1)[0].code;
          }
          let color;
          if (waterlabel === LABELS.APlusPlus.code) {
            color = LABELS.APlusPlus.color;
          } else if (waterlabel === LABELS.APlus.code) {
            color = LABELS.APlus.color;
          } else {
            color = LABELS[waterlabel].color;
          }
          return ({ coords: invertedCoords, color: color });
        }
      });
      setBuildingCoordsAndLabels(buildingCoordsAndLabels);
    })
    .catch(error => {
      console.error('Error:', error);
    });
    /*eslint-disable */
  }, [buildingGeoJSON]); // Only re-run the effect if buildingGeoJSON changes
  /*eslint-enable */
  

  const map = (
    <Map
      center={position}
      zoom={zoomLevel}
      zoomControl={false} // Removes +/- zoomcontrol on the map
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
        {buildingCoordsAndLabels.map((building) => { // Shows the surrounding buildings
          return(
            <Polygon
              positions={building.coords}
              color={building.color}
            />
          );
        })}
        {buildingGeoJSON // Shows the selected building
          ?<Polygon
            positions={latlngs}
            color={waterLabelColor}
          />
          : null
        }
      </FeatureGroup>
    </Map>
  );

  return (
    <div className="MapContainer">
      {map}
    </div>
  );
}
