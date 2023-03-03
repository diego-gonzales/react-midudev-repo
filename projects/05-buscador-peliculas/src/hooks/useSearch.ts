import { useState, useEffect, useRef } from "react";

// NOTA: Casi siempre que veas un useEffect() en tu código podría convertirse en custom hook
export function useSearch() {
  const [controlValue, setControlValue] = useState("");
  const [inputError, setInputError] = useState("");
  const isFirstInput = useRef(true);

  useEffect(() => {
    // Este if me evita que se renderice de primeros el mensaje de error
    if (isFirstInput.current) {
      isFirstInput.current = controlValue === "";
      return;
    }

    if (controlValue === "") {
      setInputError("You cannot search an empty movie");
      return;
    }

    if (controlValue.match(/^\d+$/)) {
      setInputError("You cannot search a movie with number");
      return;
    }

    if (controlValue.length < 3) {
      setInputError("You must enter at least 3 characters");
      return;
    }

    setInputError("");
  }, [controlValue]);

  return { inputError, controlValue, setControlValue };
}
