import { translations } from './translations.js';

function setToLocalStorage(key, input) {
  localStorage.setItem(key, JSON.stringify(input));
}

function getFromLocalStorage(key, defaultValue) {
  const stored = localStorage.getItem(key);
  return stored === null || stored === "undefined" ? defaultValue : JSON.parse(stored);
}

export const state = {
  language: getFromLocalStorage('language', detectLanguage()),
  displayMode: getFromLocalStorage('displayPrefference', 'light')
};

export function updateLanguage(language) {
  state.language = language;
  setToLocalStorage('language', language);
}

export function getTranslations() {
  return translations[state.language];
}

function detectLanguage() {
  const detectedLanguage = navigator.language.slice(0, 2);
  if (detectedLanguage === 'cs') return detectedLanguage;
  else return 'en'
}

export function updateDisplayMode(displayModeStatus) {
  let newStatus;
  if (displayModeStatus === 'light') newStatus = 'dark';
  else newStatus = 'light';
  
  state.displayMode = newStatus;
  setToLocalStorage('displayPrefference', newStatus);
}