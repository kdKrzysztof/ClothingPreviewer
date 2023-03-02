import React from 'react'
import ShirtRender from './shirtRender'
import templateShirt from '../assets/templateShirt.png'
import uploadImg from '../assets/dropfile.png'
import loadingIcon from '../assets/loading-icon.png'

const UploadData = () => {

    const [shirt, setShirt] = React.useState(templateShirt)
    const [classRender, setClassRender] = React.useState('renderImageContainer')

    const handleDragLeave = e => {
        e.preventDefault();
        const dropbox = document.querySelector("#uploadInputsContainer")
        dropbox.className = "uploadInputsContainerBefore"
    }
    
    const handleDragEnter = e => {
        e.preventDefault();
        const dropbox = document.querySelector("#uploadInputsContainer")
        dropbox.className = "uploadInputsContainerAfter"
    }

    const handleDrop = async e => {
        e.preventDefault();
        const dropbox = document.querySelector("#uploadInputsContainer")
        dropbox.className = "uploadInputsContainerBefore"
        const data = e.dataTransfer.files[0]
        console.log(data)
        handleUpload(data)
    }

    const handleInput = async e => {
        const data = e.target.files[0]
        console.log(data)
        handleUpload(data)
    }


    const handleUpload = async e => {

        console.log(e)
        const formData = new FormData();
        formData.append("shirtTexture", e)
    
        // const renderImgContent = document.querySelector("#renderImg")
        setShirt(loadingIcon)
        setClassRender("renderImageContainer loadingAnim")

        const respShirt = await fetch('/renderShirt', {
            method: "POST",
            body: formData,
            headers: {
              pragma: "no-cache",
              "cache-control": "no-cache"
            },
            cache: "no-cache"
        })
        .then(resp => resp.json());
        
        
        console.log("handling shirt Input")
        setClassRender("renderImageContainer")
        setShirt(respShirt)
      }

return (
    <div className="uploadShirt">
        <div className="uploadInputs">
            <div className="uploadInputsContainerBefore" id="uploadInputsContainer" onDragOver={(e)=>{e.preventDefault()}} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDrop={handleDrop}
            onClick={
                () => {
                    const input = document.querySelector('#upload')
                    input.click()
                }
            }
            >
                <input type="file" name="shirtTexture" id="upload" onChange={handleInput}></input>
                <img src={uploadImg} alt="" className="uploadFileImage noselect"></img>
                <p className="noselect">Click or drop file to upload shirt texture</p>  
            </div>
        </div>
        <div className={classRender}>         
            <ShirtRender shirt={shirt}/>
        </div>
    </div>
  )
}

export default UploadData