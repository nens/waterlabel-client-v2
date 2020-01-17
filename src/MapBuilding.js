import React from 'react';
import { Map, TileLayer, Marker, FeatureGroup, Polygon } from "react-leaflet";

import './MapBuilding.css';


export default function MapBuilding (props) {
    const zoomLevel = 19;//19
    const { selectedAddress } = props;//, buildingGeoJSON
    let position = [52.02897390884, 5.558607963674824];//[52.02891795362399, 5.558407963674824]; //[52.092802, 5.1137246];
    // if (!buildingGeoJSON) {
    // 	return (null);
    // }
    console.log("In the mapbuilding");
    let latlngs = [];
    // let latlngs2 = [ //Achterstraatje Veenendaal //3901BA nummer 16
 //      [52.02891795362399, 5.558407963674824],
 //      [52.028895006882905, 5.558556125263742],
 //      [52.028894638584, 5.558555978139519],
 //      [52.028882464748605, 5.558638842742482],
 //      [52.028883075597996, 5.558639078224903],
 //      [52.02886037368467, 5.558791728506017],
 //      [52.02886861390884, 5.558811504331883],
 //      [52.02891064530849, 5.55882798548451],
 //      [52.028992451721535, 5.558707166953551],
 //      [52.02904320489045, 5.558616595942235],
 //      [52.02904282819822, 5.55861604078445],
 //      [52.02908930582589, 5.558529664351089],
 //      [52.029016624665395, 5.558470124059828],
 //      [52.02891795362399, 5.558407963674824]
    // ];
    // if (buildingGeoJSON) {
    // 	console.log(buildingGeoJSON);
    // 	for (var i = 0; i < buildingGeoJSON.coordinates[0].length; i++) {
    // 		// if (i) {return ;}
    // 		// if (i !== 0) {
    // 		// console.log(buildingGeoJSON.coordinates[0][i]);
    // 		let lat = buildingGeoJSON.coordinates[0][i][0];
    // 		// console.log(lat);
    // 		let lng = buildingGeoJSON.coordinates[0][i][1];
    // 		// console.log(lng);
    // 		latlngs.push([lng, lat]); // deze volgorde klopt voor Polygon van leaflet
    // 		console.log([lng, lat]);
    // 		// }
    // 	}
    // } else {
	    latlngs = [ //Achterstraatje Veenendaal //3901BA nummer 16
          [52.02891795362399, 5.558407963674824],
          [52.028895006882905, 5.558556125263742],
          [52.028894638584, 5.558555978139519],
          [52.028882464748605, 5.558638842742482],
          [52.028883075597996, 5.558639078224903],
          [52.02886037368467, 5.558791728506017],
          [52.02886861390884, 5.558811504331883],
          [52.02891064530849, 5.55882798548451],
          [52.028992451721535, 5.558707166953551],
          [52.02904320489045, 5.558616595942235],
          [52.02904282819822, 5.55861604078445],
          [52.02908930582589, 5.558529664351089],
          [52.029016624665395, 5.558470124059828],
          [52.02891795362399, 5.558407963674824]
        ];
        console.log("Not using buildingGeoJSON");
    // }
    console.log(latlngs);
    // console.log(selectedAddress);
    // let key = new Date().getTime().toString();
    // console.log(key);
    // let buildingGeoJSON2 = {
 //        type: "Polygon",
 //        coordinates: [
    // 		// [4.721374511718751, 52.670761340824384], // Heerhugowaard inverted voor GeoJSON
    // 		// [4.779396057128906, 52.657435216573454],
    // 		// [4.756393432617188, 52.649937485958795],
    // 		// [4.699745178222657, 52.65181203915606]
    // 		// { lat: 4.721374511718751, lng: 52.670761340824384 }, // Heerhugowaard inverted voor GeoJSON
    // 		// { lat: 4.779396057128906, lng: 52.657435216573454 },
    // 		// { lat: 4.756393432617188, lng: 52.649937485958795 },
    // 		// { lat: 4.699745178222657, lng: 52.65181203915606 }
    // 		// { lat: 52.670761340824384, lng: 4.721374511718751 }, // Heerhugowaard
    // 		// { lat: 52.657435216573454, lng: 4.779396057128906 },
    // 		// { lat: 52.649937485958795, lng: 4.756393432617188 },
    // 		// { lat: 52.65181203915606, lng: 4.699745178222657 }
 //    	],
 //        // coordinates: [
 //        // 	{lat: 52.02891795362399, lng: 5.558407963674824},//, 43.553980556316674], // Veenendaal
 //        // 	{lat: 52.028895006882905, lng: 5.558556125263742},//, 43.554011701606214],
 //        // 	{lat: 52.028894638584, lng: 5.558555978139519},//, 43.5540123321116],
 //        // 	{lat: 52.028882464748605, lng: 5.558638842742482},// 43.554028634913266],
 //        // 	// [{lat: 52.02891795362399, lng: 5.558407963674824}]//, 43.554028634913266]
 //        // ],
 //        // coordinates: [
 //        //   [5.558407963674824, 52.02891795362399, 43.553980556316674],
 //        //   [5.558556125263742, 52.028895006882905, 43.554011701606214],
 //        //   [5.558555978139519, 52.028894638584, 43.5540123321116],
 //        //   [5.558638842742482, 52.028882464748605, 43.554028634913266],
 //        //   [5.558639078224903, 52.028883075597996, 43.55402759555727],
 //        //   [5.558791728506017, 52.02886037368467, 43.55405809171498],
 //        //   [5.558811504331883, 52.02886861390884, 43.55404319893569],
 //        //   [5.55882798548451, 52.02891064530849, 43.55397152528167],
 //        //   [5.558707166953551, 52.028992451721535, 43.5538397943601],
 //        //   [5.558616595942235, 52.02904320489045, 43.55375886056572],
 //        //   [5.55861604078445, 52.02904282819822, 43.55375952459872],
 //        //   [5.558529664351089, 52.02908930582589, 43.55368557944894],
 //        //   [5.558470124059828, 52.029016624665395, 43.5538111012429],
 //        //   // [5.558407963674824, 52.02891795362399, 43.553980556316674], // filter out point if last is first https://leafletjs.com/reference-1.5.0.html#polygon
 //        // ],
 //  	};
    // console.log(buildingGeoJSON2.coordinates);
    // let buildingCode = "";
    // if (selectedAddress) {buildingCode = selectedAddress.building; } //0345100002008052
    // console.log(buildingCode);
    const map = (
        <Map center={position} zoom={zoomLevel}
            //key={key}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          <FeatureGroup>
            <Polygon
              positions={latlngs}
              color="brown"
              height="50"
              width="50"
              //style={{color: "blue"}}// height: "50px", width: "50px",  //margin: "0 auto", height: "100%", width: "100%", 
            />
          </FeatureGroup>
        </Map>
    );
    // var polygon = L.polygon(buildingGeoJSON.coordinates, {color: 'red'}).addTo(map);
    return (
        <div className="MapContainer">
            {map}
        </div>
    );
        // {selectedAddress ? map : null}
    //		{map}
}
