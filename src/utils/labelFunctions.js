export function copyLabelData (labelToCopy) {
  return JSON.parse(JSON.stringify(labelToCopy));
}

export function copyLabelDataWithoutNullCategories (labelToCopy) {
  // console.log('labelToCopy', labelToCopy, JSON.stringify(labelToCopy));
  let copiedLabel = JSON.parse(JSON.stringify(labelToCopy));
  copiedLabel.assets = copiedLabel.assets.filter(asset => asset.asset_type !== null);
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