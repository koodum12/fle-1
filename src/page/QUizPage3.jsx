import React from "react";
import Quiz3 from "../components/Quiz3";
import Footer1 from "../components/Footer1";

export default function QuizPage2({setLevel}){
  return(
    <div className="bg-[#fcfcfc]">
      <Quiz3/>
      <Footer1 setLevel={setLevel}/>
    </div>
  );
}