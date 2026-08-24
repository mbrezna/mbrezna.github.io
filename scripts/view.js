export const elements = {
  languageToggleBtns: document.querySelectorAll('.js-language-toggle'),
  hamburgerButton: document.querySelector('.js-hamburger-button'),
  languageToggleContainer: document.querySelector('.js-language-toggle-container'),
  displayModeContainer: document.querySelector('.js-display-mode-container'),
  displayModeBtn: document.querySelector('.js-display-mode-btn'),
  navigation: document.querySelector('.js-nav'),
  sectionLinks: document.querySelectorAll('.js-section-link')
};

export function applyTranslations(translations) {
  const translatableElems = document.querySelectorAll('[data-i18n]');

  translatableElems.forEach((element) => {
    const key = element.dataset.i18n;

    if (translations[key]) element.innerHTML = translations[key];
  });

  document.documentElement.lang = translations.langAttribute;
  document.querySelector('[data-i18n-meta]').content = translations.metaDescription;
}

export function languageBtnSwitch(language) {
  elements.languageToggleBtns.forEach((button) => {
    button.classList.remove('active-language');

    if (button.dataset.language === language) button.classList.add('active-language');
  });
}

export function displayModeSwitch() {
  document.body.classList.toggle('dark-mode');
}

export function applyDisplayModePreference(preference) {
  if (preference === 'dark') document.body.classList.add('dark-mode');
  else document.body.classList.remove('dark-mode');
}

export function toggleMobileMenu() {
  elements.languageToggleContainer.classList.toggle('language-toggle-visible');
  elements.navigation.classList.toggle('nav-visible');
  elements.displayModeContainer.classList.toggle('display-mode-toggle-visible');
}