export function getPolygonBounds (geoJSON) {
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
  return {xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax};
}

export function getPolygonCenter (polygonBounds) {
  let xMean = (polygonBounds.xMin + polygonBounds.xMax) / 2;
  let yMean = (polygonBounds.yMin + polygonBounds.yMax) / 2;
  return {xMean: xMean, yMean: yMean};
}

export function createBbox (xMean, xDeviation, yMean, yDeviation) {
  return [
    xMean - xDeviation,
    yMean - yDeviation,
    xMean + xDeviation,
    yMean + yDeviation
  ];
}
