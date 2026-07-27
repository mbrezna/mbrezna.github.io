import { currencies, consumptionUnits } from './data.js';

export const elements = {
  distanceInput: document.querySelector('.js-distance'),
  consumptionInput: document.querySelector('.js-consumption'),
  fuelPriceInput: document.querySelector('.js-fuel-price'),
  passengersInput: document.querySelector('.js-passengers'),

  distanceUnitsBtns: document.querySelectorAll('.js-distance-input'),
  consumptionUnitsBtns: document.querySelectorAll('.js-consumption-input'),
  currencyBtns: document.querySelectorAll('.js-currency-input'),

  roundTripBtn: document.querySelector('.js-round-trip'),

  outConsumption: document.querySelector('.js-out-consumption'),
  outExpenses: document.querySelector('.js-out-expenses'),
  outPerPersonRow: document.querySelector('.js-per-person-row'),
  outPerPerson: document.querySelector('.js-out-per-person'),
  outPerDistance: document.querySelector('.js-out-per-distance')
}

function activateButton(buttonGroup, elementToActivate) {
  buttonGroup.forEach((btn) => btn.classList.remove('is-active'));
  if (elementToActivate) elementToActivate.classList.add('is-active');
  //proč je v této funkci to if (elementToActivate)? stane se někdy, že druhý parametr funkce nebudeme definovat??
}

export function setupInitialInputs(state) {
  elements.distanceInput.value = state.distance;
  elements.consumptionInput.value = state.consumption;
  elements.fuelPriceInput.value = state.fuelPrice;
  elements.passengersInput.value = state.passengers;
}

export function render(state, results) {
  const btnsToActivate = {
    distUnits: document.querySelector(`.js-${state.chosenDistUnit}-unit`),
    consumUnits: document.querySelector(`.js-${state.chosenConsumUnit}-unit`),
    currency: document.querySelector(`.js-${state.chosenCurrency}-currency`),
  };

  //active buttons highlight
  activateButton(elements.distanceUnitsBtns, btnsToActivate.distUnits);
  activateButton(elements.consumptionUnitsBtns, btnsToActivate.consumUnits);
  activateButton(elements.currencyBtns, btnsToActivate.currency);

  //round trip checkbox
  if (state.roundTrip) elements.roundTripBtn.classList.add('is-active');
  else if (!state.roundTrip) elements.roundTripBtn.classList.remove('is-active');

  //change of placeholders 
  elements.consumptionInput.placeholder = consumptionUnits[state.chosenConsumUnit].placeholder;
  elements.fuelPriceInput.placeholder = currencies[state.chosenCurrency].placeholder;

  //visibility of perPerson output element
  if (state.passengers > 1) elements.outPerPersonRow.classList.add('is-visible');
  else if (state.passengers === 1) elements.outPerPersonRow.classList.remove('is-visible');

  //results display
  if (results.fuelConsumption === 0) {
    elements.outConsumption.innerHTML = 'missing parameters';
    elements.outExpenses.innerHTML = 'missing parameters';
    elements.outPerPerson.innerHTML = 'missing parameters';
    elements.outPerDistance.innerHTML = 'missing parameters';
    return;
  }
  else if (results.travelExpenses === 0) {
    elements.outConsumption.innerHTML = `${results.fuelConsumption.toFixed(2)} ${consumptionUnits[state.chosenConsumUnit].unit}`;
    elements.outExpenses.innerHTML = 'missing parameters';
    elements.outPerPerson.innerHTML = 'missing parameters';
    elements.outPerDistance.innerHTML = 'missing parameters';
    return;
  }
  else {
    elements.outConsumption.innerHTML = `${results.fuelConsumption.toFixed(2)} ${consumptionUnits[state.chosenConsumUnit].unit}`;
    elements.outExpenses.innerHTML = `${results.travelExpenses.toFixed(2)} ${currencies[state.chosenCurrency].unit}`;
    elements.outPerPerson.innerHTML = `${results.expensesPerPerson.toFixed(2)} ${currencies[state.chosenCurrency].unit}`;
    elements.outPerDistance.innerHTML = `${results.expensesPerDistance.toFixed(2)} ${currencies[state.chosenCurrency].unit}/${state.chosenDistUnit === 'kms' ? 'km' : 'mi'}`;
  }
}