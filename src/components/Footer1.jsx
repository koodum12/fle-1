import React from "react";
import { useNavigate } from "react-router-dom";

export default function Footer1({ setLevel }) {
  const navigate = useNavigate();

  const handleSelectLevel = (n) => {
    console.log(
      "[Footer1] handleSelectLevel 호출됨",
      { n },
      { setLevelType: typeof setLevel, navigateType: typeof navigate }
    );

    // 안전 체크
    if (typeof setLevel !== "function") {
      console.error("setLevel이 함수가 아닙니다:", setLevel);
      return;
    }
    if (typeof navigate !== "function") {
      console.error("navigate가 함수가 아닙니다:", navigate);
      return;
    }

    navigate("/");
    setLevel(n);
  };

  return (
    <footer className="block md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50">
      <div className="flex justify-center py-2 gap-[5rem]">
        {/* 기초 */}
        <button
          type="button"
          className="flex flex-col items-center text-gray400 active:text-green600"
          onClick={() => handleSelectLevel(0)}
        >
          <span className="material-symbols-outlined text-4xl">
            stadia_controller
          </span>
          <span className="font-pretendard text-12">기초</span>
        </button>

        {/* 응용 */}
        <button
          type="button"
          className="flex flex-col items-center text-gray400 active:text-green600"
          onClick={() => handleSelectLevel(1)}
        >
          <span className="material-symbols-outlined text-4xl">
            kid_star
          </span>
          <span className="font-pretendard text-12">응용</span>
        </button>

        {/* 심화 */}
        <button
          type="button"
          className="flex flex-col items-center text-gray400 active:text-green600"
          onClick={() => handleSelectLevel(2)}
        >
          <span className="material-symbols-outlined text-4xl">
            mode_heat
          </span>
          <span className="font-pretendard text-12">심화</span>
        </button>
      </div>
    </footer>
  );
}
