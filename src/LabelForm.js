import React from 'react';

function LabelForm (props) {

  const { 
    assetTypesFromServer,
    latestWaterlabel,
    editedWaterlabel,
    guiLabelTab,
    createNewLabel,
    changeLabel,
    saveLabel,
    setGuiLabelTab,
    setEditedWaterlabel,
  } = props;

  const assetsToUse = editedWaterlabel ? editedWaterlabel.assets : (latestWaterlabel && latestWaterlabel.assets);
  const filteredAssetTypes = assetTypesFromServer.filter(type=>type.category === guiLabelTab)

  console.log('props', props)

  return <div>
    <h1>Title LabelForm</h1>

    <div>
      <button
        onClick={ e =>{
          createNewLabel();
          e.preventDefault();
        }}
        style={
          latestWaterlabel === null &&
          editedWaterlabel === null ?
          {}
          :
          {display: "none"}
        }
      >
        Nieuw Label
      </button>

      <button
        onClick={e=>{
          saveLabel();
          e.preventDefault();
        }}
        style={
          editedWaterlabel != null ?
          {}
          :
          {display: "none"}
        }
      >
        Label Opslaan
      </button>
      <button
        onClick={e => {
          e.preventDefault();
          changeLabel();
          
        }}
        style={
          latestWaterlabel !== null &&
          editedWaterlabel === null ?
          {}
          :
          {display: "none"}
        }
      >
        Verander
      </button>
    </div>
        
    <div>
      <button
        onClick={e=>{
          // this.setState({guiLabelTab: "DAK"})
          setGuiLabelTab("Dak");
          e.preventDefault();
        }}
      >
        Mijn dak
      </button>
      <button
        onClick={e=>{
          // this.setState({guiLabelTab: "TUIN"})
          setGuiLabelTab("Tuin");
          e.preventDefault();
        }}
      >
        Mijn tuin
      </button>
      <button
        onClick={e=>{
          // this.setState({guiLabelTab: "VOORZIENING"})
          setGuiLabelTab("Voorziening");
          e.preventDefault();
        }}
      >
        Mijn voorzieningen
      </button>
    </div>
    <div>
      <h4>guiLabelTab: {guiLabelTab}</h4>
      
      <div>
        <ul>
          {
            // latestWaterlabel && latestWaterlabel.assets
            assetsToUse && assetsToUse
              .map( (asset, index) => {
                const filteredAssetTypeNames = filteredAssetTypes.map(type=>type.code);
                const assetInActiveTab = 
                  filteredAssetTypeNames.includes(asset.asset_type) || 
                  asset.asset_type === null ; // also show new assets that user has not given type yet

                return (
                  <li
                    key={index}
                    style={assetInActiveTab? {}:{display:"none"}}
                  >
                    
                    { asset.asset_type === null 
                      ?
                       <select
                        onChange={ event => {
                          event.preventDefault();
                          console.log(JSON.stringify(event.target.value));
                          const copyLabel = JSON.parse(JSON.stringify(editedWaterlabel));
                          copyLabel.assets[index].asset_type = event.target.value; 
                          setEditedWaterlabel(copyLabel);
                        }}
                       >
                         {filteredAssetTypes.map(assetType=>
                           <option key={assetType.name} value={assetType.code}>{assetType.name}</option>
                         )}
                       </select>
                       :
                       <div>asset_type: {asset.asset_type}</div>
                    }
                   

                    <div>storage: {asset.storage}</div>
                    <div>infiltration: {asset.infiltration}</div>
                    <div>sewer_connection: {asset.sewer_connection + ''}</div>
                  </li>
                );
          })}
        </ul>
        <button
          style={editedWaterlabel? {}:{display:"none"}}
          onClick={e=>{
            // this.setState({guiLabelTab: "VOORZIENING"})
            e.preventDefault();
            // setGuiLabelTab("Voorziening");
            const copyLabel = JSON.parse(JSON.stringify(editedWaterlabel));
            copyLabel.assets.push({asset_type: null})
            setEditedWaterlabel(copyLabel);
          }}
        >
          NEW
        </button>
      </div>

    </div>
  </div>
}

export default LabelForm;