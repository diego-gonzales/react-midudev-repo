import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from "./consts";

export interface State {
  fromLang: FromLanguage;
  toLang: Language;
  originalText: string;
  translatedText: string;
  isLoading: boolean;
}

export type Action =
  | { type: "INTERCHANGE_LANGUAGES" }
  | { type: "SET_FROM_LANG"; payload: FromLanguage }
  | { type: "SET_TO_LANG"; payload: Language }
  | { type: "SET_ORIGINAL_TEXT"; payload: string }
  | { type: "SET_TRANSLATED_TEXT"; payload: string };

// Aquí usamos los keywords 'keyof' y 'typeof' para crear un tipo de dato, pero también podemos usar un Enum para hacerlo, pero si a día de mañana queremos trabajar con JS y no TS, podemos dejar el código como está.
export type Language = keyof typeof SUPPORTED_LANGUAGES;
export type AutoLanguage = typeof AUTO_LANGUAGE;

export type FromLanguage = Language | AutoLanguage;