export function copyLabelData (labelToCopy) {
  return JSON.parse(JSON.stringify(labelToCopy))
}

export function setAssesCategories(assets, assetTypes) {
  return assets.map(asset=>{
    const currentAssetType = assetTypes.filter(type=>type.code === asset.asset_type)[0];
    asset.type = currentAssetType;
    asset.category = currentAssetType.category;
    return asset;
  })
}