import React from 'react';
import closeVideoButton from './img/weg-knop.svg';

export default YoutubeModal;


function YoutubeModal (props) {

  const {
    guiShowVideo,
    setGuiShowVideo,
  } = props;

  return (
  //  {/* _____________________________________ SHOW VIDEO */}
    <div
      className="ModalYoutube"
      style={guiShowVideo? {}: {display:"none"}}
    >
      <div
        className="YoutubeFrame"
      >
          {guiShowVideo? 
          <iframe 
            allowFullScreen
            frameBorder="0"
            src="https://www.youtube.com/embed/jARteOPf_aI?rel=0&autoplay=0">
          </iframe>
          :
          null
          }
      </div>
      <button
        onClick={e=>{
          e.preventDefault();
          setGuiShowVideo(false);
        }}
      >
        <i>
          <img src={closeVideoButton} alt="Play-Video" />
        </i>
      </button>
    </div>
  );
}