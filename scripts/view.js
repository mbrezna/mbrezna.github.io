export const elements = {
  languageToggleBtns: document.querySelectorAll('.js-language-toggle'),
  hamburgerButton: document.querySelector('.js-hamburger-button'),
  languageToggle: document.querySelector('.js-language-toggle-container'),
  navigation: document.querySelector('.js-nav')
};

export function applyTranslations(translations) {
  const translatableElems = document.querySelectorAll('[data-i18n]');

  translatableElems.forEach((element) => {
    const key = element.dataset.i18n;

    if (translations[key]) element.innerHTML = translations[key];
  });
}

export function languageBtnSwitch(language) {
  elements.languageToggleBtns.forEach((button) => {
    button.classList.remove('active-language');

    if (button.dataset.language === language) button.classList.add('active-language');
  });
}

export function toggleMobileMenu() {
  elements.languageToggle.classList.toggle('language-toggle-visible');
  elements.navigation.classList.toggle('nav-visible');
}

console.log(elements.languageToggle);