import React from 'react';
import playButton from './img/play-knop.svg';
import LoadingIcon from "./LoadingIcon";


export default SearchAddressForm;
function SearchAddressForm (props) {

  const {
    foundAddressesList,
    assetTypeFetchState,
    searchAddressState,
    setGuiShowVideo,
    setSearchOnCityStreet,
    searchOnCityStreet,
    setSearchCity,
    searchCity,
    setSearchStreet,
    searchStreet,
    setSearchPostcode,
    searchPostcode,
    setSearchNumber,
    searchNumber,
    setSearchAddition,
    searchAddition,
    fetchBuildings,
  } = props;

  return (
    // {/*_______________________________________ SEARCH ADDDRESS FORM */}
    <div
    className={
      foundAddressesList.length === 0 &&
      assetTypeFetchState === "RECEIVED" ? 
      "SearchAddressForm" 
      : 
      "SearchAddressForm HideSearchAddressForm"
    }
  >
    <div
      className={searchAddressState == "SEND" ? 
        "SpinnerContainer Visible" 
        : 
        "SpinnerContainer Invisible" 
      }
    >
      <LoadingIcon
        singleColor={"white"}
        size={50}
      />
      <div>Zoeken adressen</div>
    </div>

    <form
    // style={
    //   foundAddressesList.length === 0 &&
    //   assetTypeFetchState === "RECEIVED" ? 
    //   {} : {display: "none"} 
    // }
    >
      <h1>Waterlabel.net</h1>
      <span>Wat doe ik tegen wateroverlast?</span>
    
      <button
        className="YoutubeButton"
        onClick={e=>{
          e.preventDefault();
          setGuiShowVideo(true);
        }}
      >
        <div>Kijk hier hoe het werkt</div>
        <i>
          <img src={playButton} alt="Play-Video" />
        </i>
      </button>

      <legend>
        Zoek hier naar een woning
      </legend>

      <div className="InputBlock">
      <div
        className="Row"
        style={
          searchOnCityStreet===true ? {} : {display: "none"} 
        }
      >
        <label 
          className="LabelLeft" 
          htmlFor="searchCity"
        >
          Stad
        </label>
        <input
          className="InputWholeRow"
          id="searchCity"
          value={searchCity}
          onChange={e=>setSearchCity( e.target.value)}
          placeholder="Bijv. Amsterdam"
        />
      </div>
      
      
        <div
          className="Row"
          style={
            searchOnCityStreet===false ? {} : {display: "none"} 
          }
        >
          <label 
            className="LabelLeft" 
            htmlFor="searchPostcode"
          >
            Postcode
          </label>
          <input
            className="InputWholeRow"
            id="searchPostcode"
            value={searchPostcode}
            onChange={e=>setSearchPostcode(e.target.value)}
            placeholder="1234 AB"
          />
        </div>
        
        <div
          className="Row"
          style={
            searchOnCityStreet===true ? {} : {display: "none"} 
          }
        >
          <label 
            className="LabelLeft" 
            htmlFor="searchStreet"
          >
          Straat
          </label>
          <input
            className="InputWholeRow"
            id="searchStreet"
            value={searchStreet}
            onChange={e=>setSearchStreet(e.target.value)}
          />
        </div>

        <div
          className="Row" 
        >
          <label 
            className="LabelLeft" 
            htmlFor="searchNumber"
          >
            Huisnr.
          </label>
          <input
            id="searchNumber"
            value={searchNumber}
            onChange={e=>setSearchNumber(e.target.value)}
          />
          <label
            className="LabelRight" 
            htmlFor="searchAddition">
            Toev.
          </label>
          <input
            id="searchAddition"
            value={searchAddition}
            onChange={e=>setSearchAddition(e.target.value)}
          />
        </div>
      </div>
      <div>
        <button
          className="ButtonToggleStreetPostcode"
          style={
            searchOnCityStreet===false ? {} : {display: "none"} 
          }
          onClick={ e => {
            e.preventDefault();
            setSearchOnCityStreet(true)
          }}
        >
          Zoek op straat
        </button>
        <button
          className="ButtonToggleStreetPostcode"
          style={
            searchOnCityStreet===true ? {} : {display: "none"} 
          }
          onClick={ e => {
            e.preventDefault();
            setSearchOnCityStreet(false)
          }}
        >
          Zoek op postcode
        </button>
      </div>
      {/* <div> */}
        <button
          className="ButtonSearch StandardButton"
          onClick={ e => {
            e.preventDefault();
            fetchBuildings();
          }}
        >
          Zoek
        </button>
        <div
          className="ErrorText"
          style={foundAddressesList.length === 0 && searchAddressState === "RECEIVED" ? {} : {display: "none"}}
        >
          <div>Onbekend adres</div>
          <div>Probeert u het nogmaals </div>
        </div>
      {/* </div> */}
    </form>
  </div>
  );
}