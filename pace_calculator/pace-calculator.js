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
  console.log(paceMin);
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
  const inputValue = Number(speedInputElem.value);
  console.log(inputValue);
  const paceDecimal = 60 / inputValue;
  //převod času z desetin na formát min+s
  const paceMin = Math.trunc(paceDecimal);
  const paceSec = (Math.round(getDecimalPart(paceDecimal) * 60)).toString().padStart(2, '0');
  console.log([paceMin, paceSec]);
  return [paceMin, paceSec];
}

function getDecimalPart(num) {
  return num - Math.trunc(num);
}



