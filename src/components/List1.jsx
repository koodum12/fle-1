import React from "react";
import { useNavigate } from "react-router-dom";

const beginnerList = [
  { step: 1, title: 'LED Blink', stars: [1, 0, 0], icon: 1, link: "*" },
  { step: 2, title: <>Button<br />(Pull Up, Down)</>, stars: [1, 0, 0], icon: 2, link: "*" },
  { step: 3, title: 'DHT11 제어', stars: [1, 1, 0], icon: 3, link: "/Quiz1" },
  { step: 4, title: '조도센서 제어', stars: [1, 1, 0], icon: 3, link: "*" },
  { step: 5, title: 'LCD 제어', stars: [1, 1, 1], icon: 3, link: "*" },
];

const intermediateList = [
  { step: 1, title: 'LED PWM', stars: [1, 0, 0], icon: 1, link: "*" },
  { step: 2, title: '서브 모터 PWM', stars: [1, 1, 0], icon: 4, link: "*" },
  { step: 3, title: 'DHT11 웹서버 전송', stars: [1, 1, 1], icon: 3, link: "/Quiz2" },
  { step: 4, title: '조도센서 웹서버 전송', stars: [1, 1, 1], icon: 3, link: "*" },
  { step: 5, title: '초음파 센서 웹서버 전송', stars: [1, 1, 1], icon: 3, link: "*" },
];

const seniorList = [
  { step: 1, title: '4Digit 세그먼트 제어', stars: [1, 1, 0], icon: 3, link: "*" },
  { step: 2, title: 'DC 모터와 드라이버', stars: [1, 1, 0], icon: 4, link: "*" },
  { step: 3, title: <>DHT11 값<br />(LCD에 출력하기)</>, stars: [1, 1, 1], icon: 3, link: "/Quiz3" },
  { step: 4, title: <>조도 센서<br />(LCD에 출력하기)</>, stars: [1, 1, 1], icon: 3, link: "*" },
  { step: 5, title: <>초음파 센서<br />(LCD에 출력하기)</>, stars: [1, 1, 1], icon: 3, link: "*" },
];

const materialIcon = [
  null,
  <span className="material-symbols-outlined">light</span>,
  <span className="material-symbols-outlined">gamepad</span>,
  <span className="material-symbols-outlined">developer_board</span>,
  <span className="material-symbols-outlined">toys_fan</span>,
];

const renderStars = (stars) =>
  stars.map((s, i) => (
    <span key={i}>
      {s === 1 ? (
        <span className="material-symbols-outlined text-green700 filled-icon text-[1rem]">
          kid_star
        </span>
      ) : (
        <span className="material-symbols-outlined text-green700">
          kid_star
        </span>
      )}
    </span>
  ));

const StepCard = ({ step, title, stars, icon, link }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (link && link !== "*") {
      navigate(link);
    }
  };

  return (
    <div
      onMouseUp={handleClick}
      className="bg-white border-2 border-gray-200 rounded-lg p-4 my-2 cursor-pointer"
    >
      <div className="flex flex-row items-center">
        <div className="flex bg-gray-300 w-[5rem] h-[5rem] rounded-[20px] items-center justify-center mr-4">
          <span className="text-[2rem]">{materialIcon[icon]}</span>
        </div>
        <div className="flex flex-col flex-grow">
          <span className="text-sm text-gray-500">Step {step}</span>
          <span className="font-semibold font-pretendard text-[1.3rem]">
            {title}
          </span>
          <span>{renderStars(stars)}</span>
        </div>
        <span className="material-symbols-outlined text-gray-400">
          arrow_forward_ios
        </span>
      </div>
    </div>
  );
};

export default function List1({ level }) {
  let list = [];

  if (level === 0) list = beginnerList;
  else if (level === 1) list = intermediateList;
  else if (level === 2) list = seniorList;

  return (
    <div>
      <div className="block md:hidden p-4 max-w-md mx-auto pt-12 mb-12">
        {list.map((step, index) => (
          <StepCard key={index} {...step} />
        ))}
      </div>
    </div>
  );
}
