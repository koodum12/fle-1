import React, { useState } from 'react';
import { startPolling, stopPolling } from '../api/API.js'; // 경로는 프로젝트 구조에 따라 수정 필요

const quizData = {
  content: [
    `#include <DHT.h>`,
    `#include <Wire.h>`,
    `#include <LiquidCrystal_I2C.h>`,
    ``,
    `DHT dht(4, DHT11); // DHT → GPIO4`,
    `LiquidCrystal_I2C lcd(0x27, 16, 2);`,
    ``,
    `void setup() {`,
    `___`,
    `}`,
    ``,
    `void loop() {`,
    `  float temp = dht.readTemperature();`,
    `  float humi = dht.readHumidity();`,
    ``,
    `  lcd.clear();`,
    `  lcd.setCursor(0, 0); lcd.print("Temp: " + String(temp) + "C");`,
    `  lcd.setCursor(0, 1); lcd.print("Humi: " + String(humi) + "%");`,
    ``,
    `  delay(2000);`,
    `}`
  ],
};

function Quiz2() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState(false);
  const [haveResult, setHaveResult] = useState(false);
  const [showFirmwareModal, setShowFirmwareModal] = useState(false);

  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);

  const handleFirmwareSend = () => {
    setShowFirmwareModal(true);

    // 폴링 시작: value = 2
    startPolling(2, ({ temperature, humidity }) => {
      setTemperature(temperature);
      setHumidity(humidity);
    });
  };

  const handleCloseModal = () => {
    setShowFirmwareModal(false);
    stopPolling(5); // 폴링 종료 (value=5 전송 포함됨)
  };

  const handleRun = async () => {
    const success = await sendToSimulator(code);
    setResult(success);
    setHaveResult(true);

    setTimeout(() => {
      setHaveResult(false);
    }, 1500);
  };

  return (
    <div className="block md:hidden relative p-4 max-w-md mx-auto">
      {haveResult && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50">
          {result ? (
            <span
              className="material-symbols-outlined text-green-600"
              style={{ fontSize: '50vw', lineHeight: '1' }}
            >
              check
            </span>
          ) : (
            <span
              className="material-symbols-outlined text-red-600"
              style={{ fontSize: '50vw', lineHeight: '1' }}
            >
              close
            </span>
          )}
        </div>
      )}

      <div className="ml-2 mt-4 font-bold font-pretendard text-1xl">
        회로도 사진
      </div>

      <div className="mb-4">
        <img
          src="img/blueprint2.png"
          alt="회로도 사진"
          className="w-full h-auto rounded-lg shadow-md"
        />
      </div>

      <div className="ml-2 mb-4 text-base font-bold font-pretendard text-1xl">
        아래 빈 칸에 알맞은 코드를 작성해주세요.
      </div>

      <div className="bg-white border-2 border-gray-100 rounded-2xl w-full h-[450px] overflow-auto px-4 py-3 font-bold font-pretendard text-1xl">
        {quizData.content.map((line, idx) => (
          <div key={idx}>
            {line === '___' ? (
              <div className="pt-8">
                <textarea
                  className="w-full h-40 bg-gray-100 rounded-2xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-600"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                />
              </div>
            ) : line === '' ? (
              <br />
            ) : (
              <pre className="font-semibold font-pretendard text-1xl">{line}</pre>
            )}
          </div>
        ))}
      </div>

      {showFirmwareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-[90vw] text-center relative">
            <div className="font-pretendard font-bold text-2xl">Web Server Data</div>
            <hr className="my-2" />
            <div className="font-pretendard font-bold">온도: <span>{temperature ?? '-'}</span>°</div>
            <div className="font-pretendard font-bold">습도: <span>{humidity ?? '-'}</span>%</div>
          </div>

          <button
            onClick={handleCloseModal}
            className="material-symbols-outlined absolute bottom-[20%] bg-gray-600 text-white w-12 h-12 rounded-full flex items-center justify-center"
          >
            close
          </button>
        </div>
      )}

      <div className="flex flex-col items-center justify-center mt-12 space-y-4 mb-[10rem] px-4">
        <button
          className="bg-green-600 w-full py-3 rounded-lg text-white font-bold font-pretendard text-1xl shadow-md hover:bg-green-700 transition"
          onClick={handleRun}
        >
          제출하기
        </button>
        <button
          onClick={handleFirmwareSend}
          className={`w-full py-2 rounded-md text-white font-bold font-pretendard text-1xl ${
            result ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'
          } transition`}
          disabled={!result}
        >
          펌웨어 전송하기
        </button>
      </div>
    </div>
  );
}

export default Quiz2;

// 정답 비교 함수
function normalizeCode(code) {
  return code
    .split('\n')
    .map(line => line.trim())
    .filter(line => line)
    .join('');
}

async function sendToSimulator(userCode) {
  const correctAnswer = ` 
    Serial.begin(115200);
    dht.begin();
    lcd.begin();
    lcd.backlight();
    `

  return normalizeCode(correctAnswer) === normalizeCode(userCode);
}
