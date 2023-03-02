import './App.css';
import React from 'react'
import UploadShirtData from './components/UploadShirtData'
import UploadPantsData from './components/UploadPantsData'
import buildaverseLogo from './assets/light_long.png'
import BVTradeLogo from './assets/BVTradet-banner-transparent.png'

function App() {

  const [comp, setComp] = React.useState(false)

  return (
    <div className="App">
      <div className="background">
        <div className="background-content-image noselect">
          <div className="twinkling noselect"></div>
          <div className="header">
            <img src={buildaverseLogo} alt="" className="BVLogo"></img>
          </div>
          <div className="container">
            <div className="buttonsContainer">
              <div className="buttons">
                <div className="button-design">
                  <button className="selectButton" onClick={() => {setComp(false)}}>SHIRT</button>
                </div>
                <div className="button-design">
                  <button className="selectButton" onClick={() => {setComp(true)}}>PANTS</button>
                </div>
              </div>
              <div className="emptySpace"></div>
            </div>
            { comp ? <UploadPantsData/> : <UploadShirtData/>}
          </div>
          <div className="footer">   
            <p>Provided by:</p>
            <img src={BVTradeLogo} alt=""></img>
            <p>Krzysiek#5558</p>
          </div>
        </div>  
      </div>
    </div>
  );
}

export default App;
