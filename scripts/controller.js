import * as Model from './model.js';
import * as View from './view.js';

function init() {
  View.elements.englishButton.addEventListener('click', () => {
    const selectedLanguage = 'en';
    Model.updateLanguage(selectedLanguage);
    View.applyTranslations(Model.state.language);
    View.languageBtnSwitch(View.elements.englishButton);
  });

  View.elements.czechButton.addEventListener('click', () => {
    const selectedLanguage = 'cs';
    Model.updateLanguage(selectedLanguage);
    View.applyTranslations(Model.state.language);
    View.languageBtnSwitch(View.elements.czechButton);
  });
}

init();