import { currencies, consumptionUnits, linkedUnits } from "./data.js";

//INPUT ELEMENTS
const distanceInputElem = document.querySelector('.js-distance');
const consumptionInputElem = document.querySelector('.js-consumption');
const fuelPriceInputElem = document.querySelector('.js-fuel-price');
const passengersInputElem = document.querySelector('.js-passengers');

//INPUT VARIABLES
let distance = getFromLocalStorage('distance') || ''
let consumption = getFromLocalStorage('consumption') || '';
let fuelPrice = getFromLocalStorage('fuelPrice') || '';
let passengers = getFromLocalStorage('passengers') || 1;
//display from localStorage
distanceInputElem.value = distance;
consumptionInputElem.value = consumption;
fuelPriceInputElem.value = fuelPrice;
passengersInputElem.value = passengers;

//CHOSEN UNITS AND CURRENCY
let chosenDistanceUnit = getFromLocalStorage('chosenDistanceUnit') || 'kms';
let chosenConsumptionUnit = getFromLocalStorage('chosenConsumptionUnit') || 'l100km';
let chosenCurrency = getFromLocalStorage('chosenCurrency') || 'czk';
//display from localStorage
const distanceUnitElemToActivate = document.querySelector(`.js-${chosenDistanceUnit}-unit`);
const consumptionUnitElemToActivate = document.querySelector(`.js-${chosenConsumptionUnit}-unit`);
const currencyElemToActivate = document.querySelector(`.js-${chosenCurrency}-currency`);
activateButton('js-distance-input', distanceUnitElemToActivate);
activateButton('js-consumption-input', consumptionUnitElemToActivate);
activateButton('js-currency-input', currencyElemToActivate);

//USER INPUT
distanceInputElem.addEventListener('input', () => {
  distance = Number(distanceInputElem.value);
  setToLocalStorage('distance', distance);
  calculate();
});
consumptionInputElem.addEventListener('input', () => {
  consumption = Number(consumptionInputElem.value);
  setToLocalStorage('consumption', consumption);
  calculate();
});
fuelPriceInputElem.addEventListener('input', () => {
  fuelPrice = Number(fuelPriceInputElem.value);
  setToLocalStorage('fuelPrice', fuelPrice);
  calculate();
});
passengersInputElem.addEventListener('input', () => {
  passengers = Number(passengersInputElem.value);
  setToLocalStorage('passengers', passengers);
  calculate();
});

//DISTANCE UNITS SELECTION
const distanceUnitsInputElems = document.querySelectorAll('.js-distance-input');

distanceUnitsInputElems.forEach((element) => {
  element.addEventListener('click', () => {
    //switching buttons
    activateButton('js-distance-input', element);
    chosenDistanceUnit = element.dataset.distance;
    setToLocalStorage('chosenDistanceUnit', chosenDistanceUnit);

    //update chosenDistanceUnit
    if (chosenDistanceUnit === 'kms') chosenConsumptionUnit = 'l100km';
    else if (chosenDistanceUnit === 'miles') chosenConsumptionUnit = 'mpg';
    setToLocalStorage('chosenConsumptionUnit', chosenConsumptionUnit);

    switchRelatedUnits('consumption', chosenDistanceUnit);

    //update input placeholders when changing units
    if (chosenDistanceUnit === 'miles') consumptionInputElem.placeholder = consumptionUnits.mpg.placeholder;
    else if (chosenDistanceUnit === 'kms') consumptionInputElem.placeholder = consumptionUnits.l100km.placeholder;

    calculate();
  });
});

//ROUND TRIP
const roundTripInputElem = document.querySelector('.js-round-trip');
let isChecked = getFromLocalStorage('isChecked');
if (isChecked) roundTripInputElem.classList.add('is-active');

roundTripInputElem.addEventListener('click', () => {
  if (!isChecked) {
    roundTripInputElem.classList.add('is-active');
    isChecked = true;
    setToLocalStorage('isChecked', isChecked);
  } else if (isChecked) {
    roundTripInputElem.classList.remove('is-active');
    isChecked = false;
    setToLocalStorage('isChecked', isChecked);
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
    setToLocalStorage('chosenConsumptionUnit', chosenConsumptionUnit);

    //update chosenDistanceUnit
    if (chosenConsumptionUnit === 'l100km') chosenDistanceUnit = 'kms';
    else if (chosenConsumptionUnit === 'mpg') chosenDistanceUnit = 'miles';
    setToLocalStorage('chosenDistanceUnit', chosenDistanceUnit);

    switchRelatedUnits('distance', chosenConsumptionUnit);

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
    chosenCurrency = element.dataset.currency;
    setToLocalStorage('chosenCurrency', chosenCurrency);

    //update input placeholders when changing currency
    fuelPriceInputElem.placeholder = currencies[chosenCurrency].placeholder;

    calculate();
  });
});

calculate();

function setToLocalStorage(id, variable) {
  return localStorage.setItem(`${id}`, JSON.stringify(variable));
}

function getFromLocalStorage(id) {
  return JSON.parse(localStorage.getItem(id));
}

function switchRelatedUnits(what, from) {
  const elementToActivate = document.querySelector(linkedUnits[from]);
  activateButton(`js-${what}-input`, elementToActivate);
}

function activateButton(groupSelector, elementToActivate) {
  const currentlyActive = document.querySelector(`.${groupSelector}.is-active`);
  if (currentlyActive) currentlyActive.classList.remove('is-active');
  elementToActivate.classList.add('is-active');
}

function calculate() {
  let fuelConsumption = 0;

  if (distance > 0 && consumption > 0) {
    if (chosenConsumptionUnit === 'l100km') fuelConsumption = ((distance / 100) * consumption);
    else if (chosenConsumptionUnit === 'mpg') fuelConsumption = (distance / consumption);
  }

  let travelExpenses = (fuelConsumption * fuelPrice);
  const expensesPerDistance = travelExpenses / distance;

  if (isChecked) {
    fuelConsumption *= 2;
    travelExpenses *= 2;
  }

  const expensesPerPerson = travelExpenses / passengers;

  const results = {
    fuelConsumption,
    travelExpenses,
    expensesPerDistance,
    expensesPerPerson
  }
  displayResults(results);
}

function displayResults(results) {
  const consumptionOutputElem = document.querySelector('.js-out-consumption');
  const expensesOutputElem = document.querySelector('.js-out-expenses');
  const perPersonRowElem = document.querySelector('.js-per-person-row');
  const perPersonOutputElem = document.querySelector('.js-out-per-person');
  const perDistanceOutputElem = document.querySelector('.js-out-per-distance');

  if (passengers > 1) perPersonRowElem.classList.add('is-visible');
  else if (passengers === 1) perPersonRowElem.classList.remove('is-visible');

  if (results.fuelConsumption === 0) {
    consumptionOutputElem.innerHTML = 'missing parameters';
    expensesOutputElem.innerHTML = 'missing parameters';
    perPersonOutputElem.innerHTML = 'missing parameters';
    perDistanceOutputElem.innerHTML = 'missing parameters';
    return;
  }
  else if (results.travelExpenses === 0) {
    consumptionOutputElem.innerHTML = `${results.fuelConsumption.toFixed(2)} ${consumptionUnits[chosenConsumptionUnit].unit}`;
    expensesOutputElem.innerHTML = 'missing parameters';
    perPersonOutputElem.innerHTML = 'missing parameters';
    perDistanceOutputElem.innerHTML = 'missing parameters';
    return;
  } else {
    consumptionOutputElem.innerHTML = `${results.fuelConsumption.toFixed(2)} ${consumptionUnits[chosenConsumptionUnit].unit}`;
    expensesOutputElem.innerHTML = `${results.travelExpenses.toFixed(2)} ${currencies[chosenCurrency].unit}`;
    perPersonOutputElem.innerHTML = `${results.expensesPerPerson.toFixed(2)} ${currencies[chosenCurrency].unit}`;
    perDistanceOutputElem.innerHTML = `${results.expensesPerDistance.toFixed(2)} ${currencies[chosenCurrency].unit}/${chosenDistanceUnit === 'kms' ? 'km' : 'mi'}`;
  }
}

