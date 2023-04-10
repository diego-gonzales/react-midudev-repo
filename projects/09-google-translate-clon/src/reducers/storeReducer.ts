import { Action, State } from "../types";
import { AUTO_LANGUAGE } from "../consts";

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
    const loading = state.originalText !== "";

    return {
      ...state,
      fromLang: state.toLang,
      toLang: state.fromLang,
      translatedText: "",
      isLoading: loading,
    };
  }

  if (type === "SET_FROM_LANG") {
    if (state.fromLang === action.payload) return state;
    const loading = state.originalText !== "";

    return {
      ...state,
      fromLang: action.payload,
      translatedText: "",
      isLoading: loading,
    };
  }

  if (type === "SET_TO_LANG") {
    if (state.toLang === action.payload) return state;
    const loading = state.originalText !== "";

    return {
      ...state,
      toLang: action.payload,
      translatedText: "",
      isLoading: loading,
    };
  }

  if (type === "SET_ORIGINAL_TEXT") {
    const loading = action.payload.trim() !== "";

    return {
      ...state,
      isLoading: loading,
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
