import React from "react";
import Quiz1 from "../components/Quiz1";
import Footer1 from "../components/Footer1";

export default function QuizePage1({setLevel}){
  return(
    <div className="bg-[#fcfcfc]">
      <Quiz1/>
      <Footer1 setLevel={setLevel}/>
    </div>
  );
}