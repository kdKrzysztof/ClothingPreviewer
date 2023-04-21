import { useRef, useState } from 'react';
import ShirtRender from './shirtRender';
import templateShirt from '../assets/templateShirt.png';
import uploadImg from '../assets/dropfile.png';
import loadingIcon from '../assets/loading-icon.png';

const UploadData = () => {
  const [shirt, setShirt] = useState(templateShirt);
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
    setDropboxClass('uploadInputsContainerBAfter');
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setDropboxClass('uploadInputsContainerBefore');
    const data = e.dataTransfer.files[0];
    handleUpload(data);
  };

  const handleInput = async (e) => {
    const data = e.target.files[0];
    handleUpload(data);
  };

  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append('shirtTexture', e);

    setShirt(loadingIcon);
    setClassRender('renderImageContainer loadingAnim');

    await fetch('/api/renderShirt', {
      method: 'POST',
      body: formData,
      headers: {
        pragma: 'no-cache',
        'cache-control': 'no-cache'
      },
      cache: 'no-cache'
    })
      .then((resp) => resp.json())
      .then((respShirt) => {
        setClassRender('renderImageContainer');
        setShirt(respShirt);
      })
      .catch((e) => console.log(e));
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
        <ShirtRender shirt={shirt} />
      </div>
    </div>
  );
};

export default UploadData;
