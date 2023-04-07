import { useReducer } from "react";
import { initialState, reducer } from "../reducers/storeReducer";
import { FromLanguage, Language } from "../types";

export function useStore() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { fromLang, toLang, originalText, translatedText } = state;

  const interchangeLanguages = () => {
    dispatch({ type: "INTERCHANGE_LANGUAGES" });
  };

  const setFromLang = (lang: FromLanguage) => {
    dispatch({ type: "SET_FROM_LANG", payload: lang });
  };

  const setToLang = (lang: Language) => {
    dispatch({ type: "SET_TO_LANG", payload: lang });
  };

  const setOriginalText = (text: string) => {
    dispatch({ type: "SET_ORIGINAL_TEXT", payload: text });
  };

  const setTranslatedText = (text: string) => {
    dispatch({ type: "SET_TRANSLATED_TEXT", payload: text });
  };

  return {
    fromLang,
    toLang,
    originalText,
    translatedText,
    interchangeLanguages,
    setFromLang,
    setToLang,
    setOriginalText,
    setTranslatedText,
  };
}
