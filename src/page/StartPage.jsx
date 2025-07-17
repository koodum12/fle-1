import React,{useState} from "react";
import Footer1 from "../components/Footer1";
import List1 from "../components/List1";

export default function StartPage(){
  const [level, setLevel] = useState(1);
  return (
    <div>
      <List1 level={level} setLevel={setLevel}/>
      <Footer1 setLevel={setLevel}/>
    </div>
  );
}