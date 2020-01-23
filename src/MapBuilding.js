import React, { useState, useEffect } from 'react';
import { Map, TileLayer, Marker, FeatureGroup, Polygon } from "react-leaflet";

import {getPolygonBounds, getPolygonCenter} from './utils/polygonFunctions';
import {arraysOfCoordsEqual} from './utils/polygonFunctions';
import './MapBuilding.css';

export default function MapBuilding (props) {
  const { buildingGeoJSON, waterLabelColor, selectedAddress, surroundingBuildings, labelColors } = props;
  const polygonBounds = getPolygonBounds(buildingGeoJSON);
  const polygonCenter = getPolygonCenter(polygonBounds);
  // Zoomlevel 19 is the most zoomed in where you still get a basemap
  const zoomLevel = 19;
  let position = [polygonCenter.yMean, polygonCenter.xMean];
  // Returning the getBounds of a react-leaflet map is quite complicated,
  // so I went for an easier solution: substracting and adding from the
  // x and y of the center of the map to get the bounding box for
  // the api call for the surrounding buildings.
  let bbox = [
    polygonCenter.xMean-0.001,
    polygonCenter.yMean-0.00075,
    polygonCenter.xMean+0.001,
    polygonCenter.yMean+0.00075
  ]
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
        // If the invertedCoords are the same as latlngs (of the selected
        // building), make the selected building of the surrounding buildings
        // transparent. To prevent from the selected building being drawn
        // twice.
        if (arraysOfCoordsEqual(latlngs, invertedCoords)){
          // Make the selected building transparent in the surrounding buildings
          return ({ coords: invertedCoords, color: "rgba(0, 0, 0, 0" });
        } else {
          let waterlabel = "G";  // Default and worst label
          if (building.waterlabels.length !== 0) {
            waterlabel = building.waterlabels[0].code;
          }
          let color = labelColors[waterlabel];
          if (waterlabel) {
            if (waterlabel === "A++") {
              color = labelColors.APlusPlus;
            } else if (waterlabel === "A+") {
              color = labelColors.APlus;
            } else {
              color = labelColors[waterlabel];
            }
          }
          return ({ coords: invertedCoords, color: color });
        }
      });
      setBuildingCoordsAndLabels(buildingCoordsAndLabels);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, [buildingGeoJSON]); // Only re-run the effect if buildingGeoJSON changes

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
