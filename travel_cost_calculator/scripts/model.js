function setToLocalStorage(key, input) {
  return localStorage.setItem(`${key}`, JSON.stringify(input));
}

function getFromLocalStorage(key, defaultValue) {
  const stored = localStorage.getItem(key);

  if (stored === null || stored === "undefined") {
    return defaultValue;
  }

  return JSON.parse(stored)
}

export const state = {
  distance: getFromLocalStorage('distance', ''),
  consumption: getFromLocalStorage('consumption', ''),
  fuelPrice: getFromLocalStorage('fuelPrice', ''),
  passengers: getFromLocalStorage('passengers', 1),

  chosenDistUnit: getFromLocalStorage('chosenDistUnit', 'kms'),
  chosenConsumUnit: getFromLocalStorage('chosenConsumUnit', 'l100km'),
  chosenCurrency: getFromLocalStorage('chosenCurrency', 'czk'),

  roundTrip: getFromLocalStorage('roundTrip', false)
};

export function updateDistance(value) {
  state.distance = value;
  setToLocalStorage('distance', value);
}

export function updateConsumption(value) {
  state.consumption = value;
  setToLocalStorage('consumption', value);
}

export function updateFuelPrice(value) {
  state.fuelPrice = value;
  setToLocalStorage('fuelPrice', value);
}

export function updatePassengers(value) {
  state.passengers = value;
  setToLocalStorage('passengers', value);
}

export function updateChosenDistUnit(unit) {
  state.chosenDistUnit = unit;
  setToLocalStorage('chosenDistUnit', unit);

  if (state.chosenDistUnit === 'kms') state.chosenConsumUnit = 'l100km';
  else if (state.chosenDistUnit === 'miles') state.chosenConsumUnit = 'mpg';
  setToLocalStorage('chosenConsumUnit', state.chosenConsumUnit);
}

export function updateChosenConsumUnit(unit) {
  state.chosenConsumUnit = unit;
  setToLocalStorage('chosenConsumUnit', unit);

  if (state.chosenConsumUnit === 'l100km') state.chosenDistUnit = 'kms';
  else if (state.chosenConsumUnit === 'mpg') state.chosenDistUnit = 'miles';
  setToLocalStorage('chosenDistUnit', state.chosenDistUnit);
}

export function updateCurrency(currency) {
  state.chosenCurrency = currency;
  setToLocalStorage('chosenCurrency', state.chosenCurrency);
}

export function toggleRoundTrip() {
  state.roundTrip = !state.roundTrip;
  setToLocalStorage('roundTrip', state.roundTrip);
}

export function calculateResults() {
  let fuelConsumption = 0;

  if (state.distance > 0 && state.consumption > 0) {
    if (state.chosenConsumUnit === 'l100km') fuelConsumption = ((state.distance / 100) * state.consumption);
    else if (state.chosenConsumUnit === 'mpg') fuelConsumption = (state.distance / state.consumption);
  }

  let travelExpenses = (fuelConsumption * state.fuelPrice);
  const expensesPerDistance = state.distance > 0 ? travelExpenses / state.distance : 0;

  if (state.roundTrip) {
    fuelConsumption *= 2;
    travelExpenses *= 2;
  }

  const expensesPerPerson = travelExpenses / state.passengers;

  return {
    fuelConsumption,
    travelExpenses,
    expensesPerDistance,
    expensesPerPerson
  };
}