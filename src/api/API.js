import axios from 'axios';

const BASE_URL = 'http://192.168.37.42:8080';

let active = false;
let pollingValue = null;
let pollTimeout = null;

export function stopPolling() {
  active = false;
  clearTimeout(pollTimeout);
  console.log('폴링 중지');
}

// 새 값이 들어올 때마다 호출됨
export function startPolling(newValue, onUpdate) {
  if (newValue === pollingValue) {
    console.log('같은 value로 이미 폴링 중입니다:', newValue);
    return;
  }

  if (newValue === 5) {
    stopPolling();
    pollingValue = null;
    return;
  }

  pollingValue = newValue;
  active = true;

  async function poll() {
    if (!active) {
      console.log('폴링 비활성화');
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/command/${pollingValue}`, null, {
        timeout: 2000, // ⏱ 타임아웃 설정
      });

      const { temperature, humidity } = res.data;

      if (typeof onUpdate === 'function') {
        onUpdate({ temperature, humidity, value: pollingValue });
      }
    } catch (err) {
      if (err.code === 'ECONNABORTED') {
        console.log('⛔ 폴링 실패! (요청 시간 초과)');
      }
      console.error(`value=${pollingValue} 요청 실패`, err);

    }

    // 다음 폴링 예약
    if (active) {
      pollTimeout = setTimeout(poll, 2000);
    }
  }

  poll();
}
