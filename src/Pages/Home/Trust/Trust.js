import React from "react";
import "./Trust.css";
import { FaFontAwesomeFlag } from 'react-icons/fa';
import { HiOutlineDesktopComputer } from 'react-icons/hi';
import { TiGroup } from 'react-icons/ti';
import { VscFeedback } from 'react-icons/vsc';

const Trust = () => {
  return (
    <div className="trust flex flex-col lg:flex-row lg:flex items-center justify-center p-12 text-red-500 text-2xl">
      <div className="text-center w-1/4 lg:w-full flex flex-col justify-center items-center">
          <FaFontAwesomeFlag className="text-6xl font-thin"></FaFontAwesomeFlag>
        <h1 className="my-2">57</h1>
        <p>Countries</p>
      </div>
      <div className="text-center w-1/4 lg:w-full flex flex-col justify-center items-center">
          <HiOutlineDesktopComputer className="text-6xl font-thin"></HiOutlineDesktopComputer>
        <h1 className="my-2">579+</h1>
        <p>Complete Projects</p>
      </div>
      <div className="text-center w-1/4 lg:w-full flex flex-col justify-center items-center">
        <TiGroup className="text-6xl font-thin"></TiGroup>
        <h1 className="my-2">285+</h1>
        <p>Happy Clints</p>
      </div>
      <div className="text-center w-1/4 lg:w-full flex flex-col justify-center items-center">
        <VscFeedback className="text-6xl font-thin"></VscFeedback>
        <h1 className="my-2">429+</h1>
        <p>Feedbacks</p>
      </div>
    </div>
  );
};

export default Trust;