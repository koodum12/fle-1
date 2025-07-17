import React from "react";
import Quiz2 from "../components/Quiz2";
import Footer1 from "../components/Footer1";

export default function QuizPage2({setLevel}){
  return(
    <div className="bg-[#fcfcfc]">
      <Quiz2 />
      <Footer1 setLevel={setLevel}/>
    </div>
  );
}