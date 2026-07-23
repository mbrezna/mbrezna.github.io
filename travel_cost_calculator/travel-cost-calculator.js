import { currencies } from "./data.js";

let distance = 0;
let consumption = 0;
let fuelPrice = 0;

const distanceInputElem = document.querySelector('.js-distance');
const consumptionInputElem = document.querySelector('.js-consumption');
const fuelPriceInputElem = document.querySelector('.js-fuel-price');

distanceInputElem.addEventListener('change', () => {
  distance = Number(distanceInputElem.value);
  calculate();
});
consumptionInputElem.addEventListener('change', () => {
  consumption = Number(consumptionInputElem.value);
  calculate();
});
fuelPriceInputElem.addEventListener('change', () => {
  fuelPrice = Number(fuelPriceInputElem.value);
  calculate();
});

//DISTANCE UNITS SELECTION
const distanceUnitsInputElems = document.querySelectorAll('.js-distance-input');
let chosenDistanceUnit = 'kms';

distanceUnitsInputElems.forEach((element) => {
  element.addEventListener('click', () => {
    //switching buttons
    document.querySelector('.js-distance-input.is-active').classList.remove('is-active');
    element.classList.add('is-active');

    //switching related consumption unit
    chosenDistanceUnit = element.dataset.distance;
    if (chosenDistanceUnit === 'kms') {
      document.querySelector('.js-consumption-input.is-active').classList.remove('is-active');
      document.querySelector('.js-l100km-unit').classList.add('is-active');
    } else if (chosenDistanceUnit === 'miles') {
      document.querySelector('.js-consumption-input.is-active').classList.remove('is-active');
      document.querySelector('.js-mpg-unit').classList.add('is-active');
    }

    //update input placeholders when changing units
    
    //distanceInputElem.placeholder = currencies[chosenCurrency].placeholder;

    //calculate();
  });
});

//CONSUMPTION MEASUREMENT SYSTEM SELECTION
const consumptionUnitsInputElems = document.querySelectorAll('.js-consumption-input');
let chosenConsumptionUnit = 'l/100km';

consumptionUnitsInputElems.forEach((element) => {
  element.addEventListener('click', () => {
    //switching buttons
    document.querySelector('.js-consumption-input.is-active').classList.remove('is-active');
    element.classList.add('is-active');

    //switching related consumption unit
    chosenConsumptionUnit = element.dataset.consumption;
    if (chosenConsumptionUnit === 'l100km') {
      document.querySelector('.js-distance-input.is-active').classList.remove('is-active');
      document.querySelector('.js-kms-unit').classList.add('is-active');
    } else if (chosenConsumptionUnit === 'mpg') {
      document.querySelector('.js-distance-input.is-active').classList.remove('is-active');
      document.querySelector('.js-miles-unit').classList.add('is-active');
    }

    //update input placeholders when changing units
    //chosenCurrency = element.dataset.currency;
    //fuelPriceInputElem.placeholder = currencies[chosenCurrency].placeholder;

    //calculate();
  });
});

//CURRENCY SELECTION
const currencyInputElems = document.querySelectorAll('.js-currency-input');
let chosenCurrency = 'czk';

currencyInputElems.forEach((element) => {
  element.addEventListener('click', () => {
    //switching buttons
    document.querySelector('.js-currency-input.is-active').classList.remove('is-active');
    element.classList.add('is-active');

    //update input placeholders when changing currency
    chosenCurrency = element.dataset.currency;
    fuelPriceInputElem.placeholder = currencies[chosenCurrency].placeholder;

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

