const distanceInputElem = document.querySelector('.js-distance');
const consumptionInputElem = document.querySelector('.js-consumption');
const fuelPriceInptuElem = document.querySelector('.js-fuel-price');

let distance = 0;
let consumption = 0;
let fuelPrice = 0;

distanceInputElem.addEventListener('change', () => {
  distance = Number(distanceInputElem.value);
  calculate();
});
consumptionInputElem.addEventListener('change', () => {
  consumption = Number(consumptionInputElem.value);
  calculate();
});
fuelPriceInptuElem.addEventListener('change', () => {
  fuelPrice = Number(fuelPriceInptuElem.value);
  calculate();
});

//CALCULATION
function calculate() {
  const fuelConsumption = ((distance / 100) * consumption);
  const travelExpenses = (fuelConsumption * fuelPrice);

  console.log(fuelConsumption);
  if (fuelConsumption === 0) {
    document.querySelector('.js-out-consumption').innerHTML = 'missing parameters';
    document.querySelector('.js-out-expenses').innerHTML = 'missing parameters';
    return;
  }
  else if (travelExpenses === 0) {
    document.querySelector('.js-out-consumption').innerHTML = `${fuelConsumption.toFixed(2)} L`;
    document.querySelector('.js-out-expenses').innerHTML = 'missing parameters';
    return;
  } else {
    document.querySelector('.js-out-consumption').innerHTML = `${fuelConsumption.toFixed(2)} L`;
    document.querySelector('.js-out-expenses').innerHTML = `${travelExpenses.toFixed(2)} Kč`;
  }
}

