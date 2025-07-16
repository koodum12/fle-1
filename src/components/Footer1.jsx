import React,{useState} from "react";
import {useNavigate} from 'react-router-dom';


export default function Footer1({setLevel}) {

  const navigate = useNavigate();

  const handleMouseUp = (n) => {
    navigate('/');
    /*
    setLevel(n);
    
    */
  };

  return (
    <div>
      <div className="block md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 mt-10">
        <div className="flex justify-center space-x-8 py-2 gap-[5rem]">
          <div className="flex flex-col items-center text-gray400 active:text-green600"
              onMouseUp={() => handleMouseUp(0)}>
            <span className="material-symbols-outlined text-4xl">stadia_controller</span>
            <span className="font-pretendard text-12">기초</span>
          </div>
          <div className="filled-icon flex flex-col items-center text-gray400 active:text-green600"
              onMouseUp={() => handleMouseUp(1)}>
            <span className="material-symbols-outlined text-4xl">kid_star</span>
            <span className="font-pretendard text-12">응용</span>
          </div>
          <div className="flex flex-col items-center text-gray400 active:text-green600"
              onMouseUp={() => handleMouseUp(2)}>
            <span className="material-symbols-outlined text-4xl">mode_heat</span>
            <span className="font-pretendard text-12">심화</span>
          </div>
        </div>
      </div>
    </div>
  );
}
