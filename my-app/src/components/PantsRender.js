import React from 'react';
// import template from '../assets/template.png'

const GetImage = ({ pants }) => {
  console.log(pants);

  return <img src={pants} alt="" className="renderImage"></img>;
};

export default GetImage;
