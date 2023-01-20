import { useEffect, useState } from "react";
import "./App.css";
import { MousePosition } from "./models/mouse-position.interface";

function App() {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const newPosition = { ...position };
      newPosition.x = event.clientX;
      newPosition.y = event.clientY;

      setPosition(newPosition);
    };

    if (enabled) {
      window.addEventListener("pointermove", handlePointerMove);
    }

    // This is executed:
    // Before the component is unmounted.
    // When the dependencies change, before running the effect again.
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [enabled]);

  useEffect(() => {
    document.body.classList.toggle("no-cursor", enabled);

    return () => {
      document.body.classList.remove("no-cursor");
    };
  }, [enabled]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          border: "1px solid #fff",
          borderRadius: "50%",
          opacity: 0.8,
          pointerEvents: "none",
          left: -25,
          top: -25,
          width: 50,
          height: 50,
          transform: `translate(${position.x}px, ${position.y}px)`,
          display: enabled ? 'block' : 'none'
        }}
      ></div>
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? "Disabled" : "Enabled"} mouse following
      </button>
    </>
  );
}

export default App;
