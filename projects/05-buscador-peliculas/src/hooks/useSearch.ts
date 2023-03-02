import { useState, useEffect, useRef } from "react";

export function useSearch() {
  const [controlValue, setControlValue] = useState("");
  const [error, setError] = useState("");
  const isFirstInput = useRef(true);

  useEffect(() => {
    // Este if me evita que se renderice de primeros el mensaje de error
    if (isFirstInput.current) {
      isFirstInput.current = controlValue === "";
      return;
    }

    if (controlValue === "") {
      setError("You cannot search an empty movie");
      return;
    }

    if (controlValue.match(/^\d+$/)) {
      setError("You cannot search a movie with number");
      return;
    }

    if (controlValue.length < 3) {
      setError("You must enter at least 3 characters");
      return;
    }

    setError("");
  }, [controlValue]);

  return { error, controlValue, setControlValue };
}
