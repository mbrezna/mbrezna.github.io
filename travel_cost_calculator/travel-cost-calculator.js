import { currencies } from "./data.js";

let distance = 0;
let consumption = 0;
let fuelPrice = 0;

const distanceInputElem = document.querySelector('.js-distance');
const consumptionInputElem = document.querySelector('.js-consumption');
const fuelPriceInptuElem = document.querySelector('.js-fuel-price');

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

//CURRENCY SELECTION
const currencyInputElems = document.querySelectorAll('.js-currency-input');
let chosenCurrency = 'czk';

currencyInputElems.forEach((element) => {
  element.addEventListener('click', () => {
    //switching buttons
    document.querySelector('.is-active').classList.remove('is-active');
    element.classList.add('is-active');

    //update input placeholders when changing currency
    chosenCurrency = element.dataset.currency;
    fuelPriceInptuElem.placeholder = currencies[chosenCurrency].placeholder;

    calculate();
  });
});

function calculate() {
  const fuelConsumption = ((distance / 100) * consumption);
  const travelExpenses = (fuelConsumption * fuelPrice);
  const results = {
    fuelConsumption,
    travelExpenses,
  }
  displayResults(results);
}

function displayResults(results) {
  if (results.fuelConsumption === 0) {
    document.querySelector('.js-out-consumption').innerHTML = 'missing parameters';
    document.querySelector('.js-out-expenses').innerHTML = 'missing parameters';
    return;
  }
  else if (results.travelExpenses === 0) {
    document.querySelector('.js-out-consumption').innerHTML = `${results.fuelConsumption.toFixed(2)} L`;
    document.querySelector('.js-out-expenses').innerHTML = 'missing parameters';
    return;
  } else {
    document.querySelector('.js-out-consumption').innerHTML = `${results.fuelConsumption.toFixed(2)} L`;
    document.querySelector('.js-out-expenses').innerHTML = `${results.travelExpenses.toFixed(2)} ${currencies[chosenCurrency].unit}`;
  }
}

