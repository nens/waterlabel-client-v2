import React, { useState, useEffect } from 'react';
import { Map, TileLayer, Marker, FeatureGroup, Polygon } from "react-leaflet";

import {getPolygonBounds, getPolygonCenter} from './utils/polygonFunctions';
import './MapBuilding.css';

export default function MapBuilding (props) {
  const { buildingGeoJSON, waterLabelColor, selectedAddress, surroundingBuildings, labelColors } = props;
  const polygonBounds = getPolygonBounds(buildingGeoJSON);
  const polygonCenter = getPolygonCenter(polygonBounds);
  // Zoomlevel 19 is the most zoomed in where you still get a basemap
  const zoomLevel = 19;
  let position = [polygonCenter.yMean, polygonCenter.xMean];
  let latlngs = [];
  const [buildingCoordsAndLabels, setBuildingCoordsAndLabels] = useState([]);

  if (buildingGeoJSON) {
    for (var i = 0; i < buildingGeoJSON.coordinates[0].length; i++) {
      // GeoJSON has longitude first
      let lng = buildingGeoJSON.coordinates[0][i][0];
      let lat = buildingGeoJSON.coordinates[0][i][1];
      // Polygon of react-leaflet has latitude first
      latlngs.push([lat, lng]);
    }
  }
  function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
      return false;
    for(var i = arr1.length; i--;) {
      for(var j = arr1.length; j--;) {
        if(arr1[i][j] !== arr2[i][j])
          return false;
      }
    }
    return true;
  }

  useEffect(() => {
    fetch(
      `/api/v2/buildings/?in_bbox=${[5.558007963674824,52.02884037368467,5.55922798548451,52.02918930582589]}`,
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
        if (arraysEqual(latlngs, invertedCoords)){
          // Make the selected building transparent in the surrounding buildings
          return ({ coords: invertedCoords, color: "rgba(0, 0, 0, 0" });
        } else {
          let waterlabel = "G";  // default and worst label
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
  }, [buildingGeoJSON]); // Only re-run the effect if count changes

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
        {buildingCoordsAndLabels.map((building) => {
          return(
            <Polygon
              positions={building.coords}
              color={building.color}
            />
          );
        })}
        {buildingGeoJSON
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
