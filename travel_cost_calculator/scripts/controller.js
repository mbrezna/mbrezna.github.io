import * as Model from './model.js';
import * as View from './view.js';

function updateAndRender() {
  const results = Model.calculateResults();
  View.render(Model.state, results);
}

function init() {
  View.setupInitialInputs(Model.state);
  
  updateAndRender();

  View.elements.distanceInput.addEventListener('input', () => {
    Model.updateDistance(Number(View.elements.distanceInput.value));
    updateAndRender();
  });

  View.elements.consumptionInput.addEventListener('input', () => {
    Model.updateConsumption(Number(View.elements.consumptionInput.value));
    updateAndRender();
  });

  View.elements.fuelPriceInput.addEventListener('input', () => {
    Model.updateFuelPrice(Number(View.elements.fuelPriceInput.value));
    updateAndRender();
  });

  View.elements.passengersInput.addEventListener('input', () => {
    Model.updatePassengers(Number(View.elements.passengersInput.value));
    updateAndRender();
  });

  View.elements.distanceUnitsBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selectedUnit = btn.dataset.distance;
      Model.updateChosenDistUnit(selectedUnit);
      updateAndRender();
    });
  });

  View.elements.consumptionUnitsBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selectedUnit = btn.dataset.consumption;
      Model.updateChosenConsumUnit(selectedUnit);
      updateAndRender();
    });
  });

  View.elements.currencyBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selectedCurrency = btn.dataset.currency;
      Model.updateCurrency(selectedCurrency);
      updateAndRender();
    });
  });

  View.elements.roundTripBtn.addEventListener('click', () => {
    Model.toggleRoundTrip();
    updateAndRender();
  });

  //proč jsou všechny eventListenery vložené dovnitř init()??
}

init();