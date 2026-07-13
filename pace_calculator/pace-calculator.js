const paceMinInputElem = document.querySelector('.js-pace-min');
const paceSecInputElem = document.querySelector('.js-pace-sec')
const speedInputElem = document.querySelector('.js-speed-input');

paceMinInputElem.addEventListener('input', () => {
  speedInputElem.value = calculateSpeed();
});
paceSecInputElem.addEventListener('input', () => {
  speedInputElem.value = calculateSpeed();
});
speedInputElem.addEventListener('input', () => {
  const [paceMin, paceSec] = calculatePace();
  paceMinInputElem.value = paceMin;
  paceSecInputElem.value = paceSec;
})

//CALCULATIONS
function calculateSpeed() {
  const inputMin = Number(paceMinInputElem.value);
  const inputSec = Number(paceSecInputElem.value);
  return (60 / (inputMin + (inputSec / 60))).toFixed(2);
}

function calculatePace() {
  const speed = Number(speedInputElem.value);
  const paceDecimal = 60 / speed;
  const paceMin = Math.trunc(paceDecimal);
  const paceSec = Math.round((paceDecimal % 1) * 60).toString().padStart(2, '0');
  return [paceMin, paceSec];
}




