import { currencies, consumptionUnits, linkedUnits } from "./data.js";

let distance = 0;
let consumption = 0;
let fuelPrice = 0;

const distanceInputElem = document.querySelector('.js-distance');
const consumptionInputElem = document.querySelector('.js-consumption');
const fuelPriceInputElem = document.querySelector('.js-fuel-price');

let chosenDistanceUnit = 'kms';
let chosenConsumptionUnit = 'l100km';
let chosenCurrency = 'czk';

distanceInputElem.addEventListener('input', () => {
  distance = Number(distanceInputElem.value);
  calculate();
});
consumptionInputElem.addEventListener('input', () => {
  consumption = Number(consumptionInputElem.value);
  calculate();
});
fuelPriceInputElem.addEventListener('input', () => {
  fuelPrice = Number(fuelPriceInputElem.value);
  calculate();
});

//DISTANCE UNITS SELECTION
const distanceUnitsInputElems = document.querySelectorAll('.js-distance-input');

distanceUnitsInputElems.forEach((element) => {
  element.addEventListener('click', () => {
    //switching buttons
    activateButton('js-distance-input', element);
    chosenDistanceUnit = element.dataset.distance;
    //update chosenDistanceUnit
    if (chosenDistanceUnit === 'kms') chosenConsumptionUnit = 'l100km';
    else if (chosenDistanceUnit === 'miles') chosenConsumptionUnit = 'mpg';

    //switch to related units
    const elementToActivate = document.querySelector(linkedUnits[chosenDistanceUnit]);
    activateButton('js-consumption-input', elementToActivate);

    //update input placeholders when changing units
    if (chosenDistanceUnit === 'miles') consumptionInputElem.placeholder = consumptionUnits.mpg.placeholder;
    else if (chosenDistanceUnit === 'kms') consumptionInputElem.placeholder = consumptionUnits.l100km.placeholder;

    calculate();
  });
});

//ROUND TRIP
const roundTripInputElem = document.querySelector('.js-round-trip');
let isChecked;
roundTripInputElem.addEventListener('click', () => {
  if (!isChecked) {
    roundTripInputElem.classList.add('is-active');
    isChecked = true;
  } else if (isChecked) {
    roundTripInputElem.classList.remove('is-active');
    isChecked = false;
  }
  calculate();
});

//CONSUMPTION MEASUREMENT SYSTEM SELECTION
const consumptionUnitsInputElems = document.querySelectorAll('.js-consumption-input');

consumptionUnitsInputElems.forEach((element) => {
  element.addEventListener('click', () => {
    //switching buttons
    activateButton('js-consumption-input', element);
    chosenConsumptionUnit = element.dataset.consumption;

    //switch to related units
    const elementToActivate = document.querySelector(linkedUnits[chosenConsumptionUnit]);
    activateButton('js-distance-input', elementToActivate);

    //update input placeholders when changing units
    consumptionInputElem.placeholder = consumptionUnits[chosenConsumptionUnit].placeholder;

    calculate();
  });
});

//CURRENCY SELECTION
const currencyInputElems = document.querySelectorAll('.js-currency-input');

currencyInputElems.forEach((element) => {
  element.addEventListener('click', () => {
    //switching buttons
    activateButton('js-currency-input', element);

    //update input placeholders when changing currency
    chosenCurrency = element.dataset.currency;
    fuelPriceInputElem.placeholder = currencies[chosenCurrency].placeholder;

    calculate();
  });
});

function activateButton(groupSelector, elementToActivate) {
  document.querySelector(`.${groupSelector}.is-active`).classList.remove('is-active');
  elementToActivate.classList.add('is-active');
}

function calculate() {
  let fuelConsumption = 0;
  if (distance > 0 && consumption > 0) {
    if (chosenConsumptionUnit === 'l100km') fuelConsumption = ((distance / 100) * consumption);
    else if (chosenConsumptionUnit === 'mpg') fuelConsumption = (distance / consumption);
  }
  let travelExpenses = (fuelConsumption * fuelPrice);

  if (isChecked) {
    fuelConsumption *= 2;
    travelExpenses *= 2;
  }

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
    document.querySelector('.js-out-consumption').innerHTML = `${results.fuelConsumption.toFixed(2)} ${consumptionUnits[chosenConsumptionUnit].unit}`;
    document.querySelector('.js-out-expenses').innerHTML = 'missing parameters';
    return;
  } else {
    document.querySelector('.js-out-consumption').innerHTML = `${results.fuelConsumption.toFixed(2)} ${consumptionUnits[chosenConsumptionUnit].unit}`;
    document.querySelector('.js-out-expenses').innerHTML = `${results.travelExpenses.toFixed(2)} ${currencies[chosenCurrency].unit}`;
  }
}

