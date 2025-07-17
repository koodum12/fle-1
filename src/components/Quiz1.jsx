import React, { useState, useEffect } from "react";

const dht11Code = [
  '#include <DHT.h>',
  '#define DHTPIN 5',
  '#define DHTTYPE DHT11',
  '',
  'DHT dht(DHTPIN, DHTTYPE);',
  'void setup() {',
  '  Serial.begin(9600);',
  '  dht.begin();',
  '}',
  '',
  'void loop() {',
  '  float t = dht.readTemperature();',
  '  float h = dht.readHumidity();',
  '  if (!isnan(t) && !isnan(h)) {',
  '___',
  '    Serial.print(" C, Humidity: "); Serial.println(h);',
  '  } else {',
  '    Serial.println("DHT Error");',
  '  }',
  '  delay(2000);',
  '}'
];

const answerKey = [
  'Serial.print("Temp: "); Serial.print(t);',
  'DHT.read11(dht_apin);',
  'Serial.print("Temp: "); Serial.println();',
  'Serial.print "Temperature: ";',
];

const correctAnswer = 'Serial.print("Temp: "); Serial.print(t);';

export default function Quiz1() {
  const [clickAnswer, setClickAnswer] = useState(-1);
  const result = clickAnswer === -1 ? null : answerKey[clickAnswer] === correctAnswer;

  useEffect(() => {
    if (clickAnswer !== -1) {
      const timer = setTimeout(() => setClickAnswer(-1), 1500);
      return () => clearTimeout(timer);
    }
  }, [clickAnswer]);

  return (
    <div className="block md:hidden relative">
      <div className="">
      </div>
        <div className="ml-[2.5rem] font-bold font-pretendard text-1xl">아래 빈 칸에 들어갈 코드를 골라주세요</div>

        <div className="bg-white border-2 border-gray50 rounded-[20px] w-[342px] h-[450px] overflow-auto ml-[2rem] pt-2 px-4">
          {dht11Code.map((line, idx) => (
            <div key={idx} className="my-1">
              {line === '' ? <br /> : line === '___' ? (
                <div className="bg-gray100 border-gray100 w-[10rem] h-[1.5rem] rounded-[20px]" />
              ) : (
                <div className="font-semibold font-pretendard text-1xl">{line}</div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap mt-10 text-center ml-[2rem]">
          {answerKey.map((data, idx) => (
            <div
              key={idx}
              onClick={() => setClickAnswer(idx)}
              className="flex items-center justify-center h-[3em] px-4 rounded-[12px] border-2 mr-3 mb-3 border-gray-300 active:bg-green-200 font-semibold font-pretendard text-1xl"
            >
              {data}
            </div>
          ))}
        </div>

        {/* 중앙에 잠깐 표시되는 결과 아이콘 */}
        {clickAnswer !== -1 && (
          <div className="fixed inset-0 flex justify-center items-center z-50 bg-opacity-30">
            {result ? (
              <span
                className="material-symbols-outlined text-green-600"
                style={{
                  fontSize: '50vw',
                  lineHeight: '1',
                }}
              >
                check
              </span>
            ) : (
              <span
                className="material-symbols-outlined text-red-600"
                style={{
                  fontSize: '50vw',
                  lineHeight: '1',
                }}
              >
                close
              </span>
            )}
          </div>
        )}
    </div>
  );
}
