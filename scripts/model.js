function setToLocalStorage(key, input) {
  localStorage.setItem(key, JSON.stringify(input));
}

function getFromLocalStorage(key, defaultValue) {
  const stored = localStorage.getItem(key);
  return stored === null || stored === "undefined" ? defaultValue : JSON.parse(stored);
}

export const state = {
  language: getFromLocalStorage('language', 'en')
};

export function updateLanguage(language) {
  state.language = language;
  setToLocalStorage('language', language);
}