import React from 'react'
// import template from '../assets/template.png'



const GetImage = ({shirt}) => {
  
  console.log(shirt)

  return (
    <img src={shirt} alt="" className="renderImage"></img>
  )
}

export default GetImage