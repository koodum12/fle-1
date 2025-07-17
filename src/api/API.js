import axios from 'axios';

const BASE_URL = 'https://192.168.37.42:9443';

let active = false;
let pollTimeout = null;

export function stopPolling() {
  active = false;
  clearTimeout(pollTimeout);
  console.log('폴링 중지');
}

export function startPolling(newValue, onUpdate) {
  if (active) {
    console.log('이미 폴링 중입니다');
    return;
  }

  if (newValue === 5) {
    axios.post(`${BASE_URL}/command${newValue}`,null)
    stopPolling(newValue);
    return;
  }

  active = true;

  // 🔷 최초 값 전송
  axios.post(`${BASE_URL}/command/${newValue}`,null, { timeout: 2000 })
    .then(() => {
      console.log(`✅ 초기 value(${newValue}) 전송 성공`);
      poll(); // 폴링 시작
    })
    .catch((err) => {
      console.error(`❌ 초기 value(${newValue}) 전송 실패`, err);
      stopPolling(5);
    });

  async function poll() {
    if (!active) {
      console.log('폴링 비활성화');
      return;
    }

    try {
      const res = await axios.get(`${BASE_URL}/status`, {
        timeout: 2000,
      });

      const { temperature, humidity } = res.data;

      if (typeof onUpdate === 'function') {
        onUpdate({ temperature, humidity });
        console.log(temperature, humidity);
      }
    } catch (err) {
      if (err.code === 'ECONNABORTED') {
        console.log('⛔ 폴링 실패! (요청 시간 초과)');
      }
      console.error('폴링 요청 실패', err);
    }

    if (active) {
      pollTimeout = setTimeout(poll, 2000);
    }
  }
}
