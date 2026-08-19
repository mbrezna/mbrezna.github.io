export const elements = {
  englishButton: document.querySelector('.js-english-btn'),
  czechButton: document.querySelector('.js-czech-btn')
};

export function applyTranslations(translations) {
  const translatableElems = document.querySelectorAll('[data-i18n]');

  translatableElems.forEach((element) => {
    const key = element.dataset.i18n;

    if (translations[key]) element.innerHTML = translations[key];
  });
}

export function languageBtnSwitch(button) {
  elements.englishButton.classList.remove('active-language');
  elements.czechButton.classList.remove('active-language');
  button.classList.add('active-language');
}