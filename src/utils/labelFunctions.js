export function copyLabelData (labelToCopy) {
  // console.log('labelToCopy', labelToCopy, JSON.stringify(labelToCopy));
  return JSON.parse(JSON.stringify(labelToCopy))
}

export function setAssetCategories(assets, assetTypes) {
  return assets.map(asset=>{
    const currentAssetType = assetTypes.filter(type=>type.code === asset.asset_type)[0];
    asset.type = currentAssetType;
    asset.category = currentAssetType.category;
    return asset;
  })
}