import { Action, State } from '../types';
import { AUTO_LANGUAGE } from '../consts';

export const initialState: State = {
  fromLang: "auto",
  toLang: "en",
  originalText: "",
  translatedText: "",
  isLoading: false,
};

export const reducer = (state: State, action: Action) => {
  const { type } = action;

  if (type === "INTERCHANGE_LANGUAGES") {
    if (state.fromLang === AUTO_LANGUAGE) return state;

    return {
      ...state,
      fromLang: state.toLang,
      toLang: state.fromLang,
    };
  }

  if (type === "SET_FROM_LANG") {
    return {
      ...state,
      fromLang: action.payload,
    };
  }

  if (type === "SET_TO_LANG") {
    return {
      ...state,
      toLang: action.payload,
    };
  }

  if (type === "SET_ORIGINAL_TEXT") {
    return {
      ...state,
      isLoading: true,
      originalText: action.payload,
      translatedText: "",
    };
  }

  if (type === "SET_TRANSLATED_TEXT") {
    return {
      ...state,
      isLoading: false,
      translatedText: action.payload,
    };
  }

  return state;
};
