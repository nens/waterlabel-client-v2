export function copyLabelData (labelToCopy) {
  return JSON.parse(JSON.stringify(labelToCopy));
}

export function copyLabelDataWithoutNullCategories (labelToCopy) {
  let copiedLabel = JSON.parse(JSON.stringify(labelToCopy));
  copiedLabel.assets = 
    copiedLabel.assets
      // asset type has to be choosen
      .filter(asset => asset.asset_type !== null)
      // area should not be the empty string
      .filter(asset => asset.area !== '')
      // if it is a voorziening then storage should not be the empty string
      .filter(asset => asset.category !== 'Voorziening' || asset.storage !== '');
  return copiedLabel;
}

export function setAssetCategories(assets, assetTypes) {
  return assets.map(asset=>{
    const currentAssetType = assetTypes.filter(type=>type.code === asset.asset_type)[0];
    asset.type = currentAssetType;
    asset.category = currentAssetType.category;
    return asset;
  })
}

export function getLabelAssetsTotalArea(assets) {
  return assets.reduce((acc, curr)=>acc+((parseInt(curr.area) || 0)), 0 )
}