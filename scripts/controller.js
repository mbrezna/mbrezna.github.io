import * as Model from './model.js';
import * as View from './view.js';

function init() {
  View.applyTranslations(Model.getTranslations());
  View.languageBtnSwitch(Model.state.language);

  View.elements.languageToggleBtns.forEach((button) => {
    button.addEventListener('click', () => {
      const selectedLanguage = button.dataset.language;
      Model.updateLanguage(selectedLanguage);
      View.applyTranslations(Model.getTranslations());
      View.languageBtnSwitch(selectedLanguage);
    });
  });

  View.elements.hamburgerButton.addEventListener('click', () => {
    View.toggleMobileMenu();
  });
}

init();