import { Link } from "../Link";

const i18n = {
  es: {
    title: "Acerca de",
    description: "Hola me llamo Diego y estoy creando un clon de React Router",
    linkText: "Ir a Inicio",
  },
  en: {
    title: "About",
    description: "Hi my name is Diego and I'm creating a clone of React Router",
    linkText: "Go to Home",
  },
};

const useI18n = (lang) => {
  return i18n[lang] || i18n.es;
};

export default function About({ routeParams }) {
  const { lang } = routeParams;
  const { title, description, linkText } = useI18n(lang);

  return (
    <>
      <h1>{title}</h1>
      <div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn3lM0queCIxu_5XXCo-bv95tjAIorzfDASA&usqp=CAU"
          alt="Foto de prueba"
        />
        <p>{description}</p>
      </div>
      <Link to="/">{linkText}</Link>
    </>
  );
}