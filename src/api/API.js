import axios from 'axios';

const BASE_URL = 'https://192.168.37.42:9443';

let active = false;
let pollTimeout = null;

/**
 * 폴링을 중단하고, 선택적으로 서버에 값을 전송
 * @param {number} [value] - 중단 시 서버에 전송할 값 (선택)
 */
export function stopPolling(value) {
  active = false;
  clearTimeout(pollTimeout);
  console.log('🔷 폴링 중단');

  if (value !== undefined) {
    axios.post(`${BASE_URL}/command/${value}`, null)
      .then(() => {
        console.log(`✅ stopPolling 시 value(${value}) 전송 성공`);
      })
      .catch((err) => {
        console.error(`❌ stopPolling 시 value(${value}) 전송 실패`, err);
      });
  }
}

/**
 * 폴링 시작
 * @param {number} newValue - 서버에 보낼 초기 값
 * @param {function} onUpdate - 온도/습도 업데이트 콜백
 */
export function startPolling(newValue, onUpdate) {
  if (active) {
    console.log('⚠️ 이미 폴링 중입니다');
    return;
  }

  if (newValue === 5) {
    stopPolling(5);  // 여기서 5를 넘겨서 stop과 함께 전송
    return;
  }

  active = true;

  // 🔷 최초 값 전송
  axios.post(`${BASE_URL}/command/${newValue}`, null, { timeout: 2000 })
    .then(() => {
      console.log(`✅ 초기 value(${newValue}) 전송 성공`);
      poll(); // 폴링 시작
    })
    .catch((err) => {
      console.error(`❌ 초기 value(${newValue}) 전송 실패`, err);
      stopPolling(5);
    });

  // 내부 폴링 함수
  async function poll() {
    if (!active) {
      console.log('🔷 폴링이 비활성화되어 중단됩니다');
      return;
    }

    try {
      const res = await axios.get(`${BASE_URL}/temperature-and-humidity`, {
        timeout: 2000,
      });

      const { temperature, humidity } = res.data;

      if (typeof onUpdate === 'function') {
        onUpdate({ temperature, humidity });
        console.log(`🌡️ 온도: ${temperature}, 💧 습도: ${humidity}`);
      }
    } catch (err) {
      if (err.code === 'ECONNABORTED') {
        console.warn('⛔ 폴링 실패! (요청 시간 초과)');
      } else {
        console.error('❌ 폴링 요청 실패', err);
      }
    }

    if (active) {
      pollTimeout = setTimeout(poll, 2000);
    }
  }
}
