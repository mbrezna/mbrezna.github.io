import * as Model from './model.js';
import * as View from './view.js';
import { translations } from './translations.js';

function init() {
  View.applyTranslations(Model.state.language);
  View.languageBtnSwitch(Model.state.language === 'en' ? View.elements.englishButton : View.elements.czechButton);

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