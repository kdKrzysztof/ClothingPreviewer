import React from 'react';
import PantsRender from './PantsRender';
import templatePants from '../assets/templatePants.png';
import uploadImg from '../assets/dropfile.png';
import loadingIcon from '../assets/loading-icon.png';

const UploadData = () => {
  const [pants, setPants] = React.useState(templatePants);
  const [classRender, setClassRender] = React.useState('renderImageContainer');

  const handleDragLeave = (e) => {
    e.preventDefault();
    const dropbox = document.querySelector('#uploadInputsContainer');
    dropbox.className = 'uploadInputsContainerBefore';
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    const dropbox = document.querySelector('#uploadInputsContainer');
    dropbox.className = 'uploadInputsContainerAfter';
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const dropbox = document.querySelector('#uploadInputsContainer');
    dropbox.className = 'uploadInputsContainerBefore';
    const data = e.dataTransfer.files[0];
    handleUpload(data);
  };

  const handleInput = async (e) => {
    const data = e.target.files[0];
    handleUpload(data);
  };

  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append('pantsTexture', e);

    setPants(loadingIcon);
    setClassRender('renderImageContainer loadingAnim');

    const respPants = await fetch('/api/renderPants', {
      method: 'POST',
      headers: {
        pragma: 'no-cache',
        'cache-control': 'no-cache'
      },
      body: formData,
      cache: 'no-cache'
    })
      .then((resp) => resp.json())
      .catch((e) => console.log(e));

    setClassRender('renderImageContainer');
    setPants(respPants);
  };

  return (
    <div className="uploadShirt">
      <div className="uploadInputs">
        <div
          className="uploadInputsContainerBefore"
          id="uploadInputsContainer"
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => {
            const input = document.querySelector('#upload');
            input.click();
          }}
        >
          <input type="file" name="shirtTexture" id="upload" onChange={handleInput}></input>
          <img src={uploadImg} alt="" className="uploadFileImage noselect"></img>
          <p className="noselect">Click or drop file to upload shirt texture</p>
        </div>
      </div>
      <div className={classRender}>
        <PantsRender pants={pants} />
      </div>
    </div>
  );
};

export default UploadData;
