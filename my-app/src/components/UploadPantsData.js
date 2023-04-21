import { useRef, useState } from 'react';
import PantsRender from './PantsRender';
import templatePants from '../assets/templatePants.png';
import uploadImg from '../assets/dropfile.png';
import loadingIcon from '../assets/loading-icon.png';

const UploadData = () => {
  const [pants, setPants] = useState(templatePants);
  const [classRender, setClassRender] = useState('renderImageContainer');
  // eslint-disable-next-line no-unused-vars
  const [dropboxClass, setDropboxClass] = useState('uploadInputsContainerBefore');
  const uploadInput = useRef(null);

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDropboxClass('uploadInputsContainerBefore');
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDropboxClass('uploadInputsContainerAfter');
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setDropboxClass('uploadInputsContainerBefore');
    const data = e.dataTransfer.files[0];
    handleUpload(data);
  };

  const handleInput = (e) => {
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
    });

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
            uploadInput?.current.click();
          }}
        >
          <input
            ref={uploadInput}
            type="file"
            name="shirtTexture"
            id="upload"
            onChange={handleInput}
          ></input>
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
