import React from "react";
import { useNavigate } from "react-router-dom";

export default function Footer1({ setLevel }) {
  const navigate = useNavigate();
  

  const handlePress = (n) => {
    if (typeof setLevel !== "function") {
      console.error("setLevel이 함수가 아닙니다:", setLevel);
      return;
    }
    setLevel(n);
    navigate("/");
  };

  return (
    <div>
      <div className="block md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 mt-10">
        <div className="flex justify-center space-x-8 py-2 gap-[5rem]">
          {[0, 1, 2].map((n) => {
            const icons = ["stadia_controller", "kid_star", "mode_heat"];
            const labels = ["기초", "응용", "심화"];
            return (
              <button
                key={n}
                type="button"
                className="flex flex-col items-center text-gray-400 active:text-green-600 focus:outline-none"
                onClick={() => handlePress(n)}
              >
                <span className="material-symbols-outlined text-4xl">
                  {icons[n]}
                </span>
                <span className="font-pretendard text-12">{labels[n]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
