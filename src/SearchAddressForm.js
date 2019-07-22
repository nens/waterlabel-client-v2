import React from 'react';
import playButton from './img/play-knop.svg';

import backgroundImage from "./img/background.jpg";
import deWaagLogo from './img/de_waag.png';
import huisjeBoompjeBeterLogo from './img/huisjeBoompjeBeter.png';
import denHaagLogo from './img/denHaag.png';
import amstelGooiVechtLogo from './img/amstelGooiVecht.png';
import rotterdamLogo from './img/rotterdam.png';
import amsterdamRainproofLogo from './img/amsterdamRainproof.png';


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
    <div
      className={
        foundAddressesList.length === 0 &&
        assetTypeFetchState === "RECEIVED" ? 
        "SearchAddressFormContainerTop" 
        : 
        "SearchAddressFormContainerTop HideSearchAddressForm"
      }
    >
      <div
        className="SearchAddressFormContainer"
      >
      <div
        className="SearchAddressForm" 
      >
        <div
          className={searchAddressState === "SEND" ? 
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

        <form>
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
          <div>
            <a 
              href="https://waterlabel-v1.lizard.net/"
              className="LinkOldSite"
              // target = blank is probably a bad idea
              // target="_blank"
            >
              Klik hier voor de oude waterlabel site
            </a>
          </div>
        </form>
      </div>
      <div
          className="Logos"
        >
        {/* van deWaag bestaat geen website ? */}
        <img
          alt="Logo de Waag"
          src={deWaagLogo}
        />
        <a
        href="https://www.huisjeboompjebeter.nl/"
        >
        <img
          alt="Logo huisje boompje beter"
          src={huisjeBoompjeBeterLogo}
        />
        </a>
        <a
        href="https://www.denhaag.nl"
        >
        <img
          alt="Logo Den Haag"
          src={denHaagLogo}
        />
        </a>
        <a
        href="https://www.agv.nl/"
        >
        <img
          alt="Logo Waterschap Amstel Gooi en Vecht"
          src={amstelGooiVechtLogo}
        />
        </a>
        <a
        href="https://www.rotterdam.nl/"
        >
        <img
          alt="Logo Rotterdam"
          src={rotterdamLogo}
        />
        </a>
        <a
        href="https://www.rainproof.nl/"
        >
        <img
          alt="Logo Rainproof"
          src={amsterdamRainproofLogo}
        />
        </a>
      </div>
    </div>
    <div
      className="BackgroundImageSearchAddressForm"
      style={{
        backgroundImage: `url("${backgroundImage}")`,
        backgroundRepeat: "no-repeat",
      }}
    ></div>
  </div>
  );
}