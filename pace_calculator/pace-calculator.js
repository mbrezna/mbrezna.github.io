const paceBtnElem = document.querySelector('.js-pace-submit-button')
paceBtnElem.addEventListener('click', () => {
  calculateSpeed();
});

const speedBtnElem = document.querySelector('.js-speed-submit-button')
speedBtnElem.addEventListener('click', () => {
  calculatePace();
});

function getValue(unit) {
  const inputValue = document.querySelector(`.js-${unit}-input`).value;
  return inputValue;
}

function calculateSpeed() {
  const inputValue = getValue('pace');
  const speed = 60 / inputValue;
  console.log(speed);
}

function calculatePace() {
  const inputValue = getValue('speed');
  const paceDecimal = 60 / inputValue;
  //převod času z desetin na formát min+s
  console.log(paceDecimal);
  const paceMin = Math.trunc(paceDecimal);
  const paceSec = Math.round(getDecimalPart(paceDecimal) * 60);
  const pace = `${paceMin}\'${paceSec}\"` 
  console.log(pace);
}

function getDecimalPart(num) {
  return num - Math.trunc(num);
}



