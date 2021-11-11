export const supportedLocales = {
  ko: "한국어",
  en: "English"
};

export function getSupportedLocales() {
  let annotatedLocales = [];

  for (const code of Object.keys(supportedLocales)) {
    annotatedLocales.push({
      text: supportedLocales[code],
      value: code
    });
  }

  return annotatedLocales;
}
