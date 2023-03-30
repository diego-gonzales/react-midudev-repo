import { EVENTS } from "./consts";

function navigate(path) {
  window.history.pushState({}, "", path);
  // Crear un evento personalizado para avisar a los componentes que el path ha cambiado
  const navigationEvent = new Event(EVENTS.PUSHSTATE);
  window.dispatchEvent(navigationEvent);
}

export function Link({ target, to, ...props }) {
  const handleClick = (e) => {
    const isMainEvent = e.button === 0; // click izquierdo
    const isModifiedEvent = e.ctrlKey || e.metaKey || e.shiftKey || e.altKey;
    const isManageableEvent = target === undefined || target === "_self";

    if (isMainEvent && !isModifiedEvent && isManageableEvent) {
      e.preventDefault();
      navigate(to);
    }
  };

  return <a onClick={handleClick} href={to} target={target} {...props} />;
}
