import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import enTranslation from './assets/translations/en-US.json';
import khTranslation from './assets/translations/km-KH.json';

//import { useTranslation } from "react-i18next";
// const { t, i18n } = useTranslation();

// // Function to change language
// const changeLanguage = (lang) => {
//   i18n.changeLanguage(lang);
// };
// translate :: > t("welcome_to")

i18n
  .use(LanguageDetector) // Automatically detect user language
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      kh: {
        translation: khTranslation,
      },
    },
    fallbackLng: "en", // Default language
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;
