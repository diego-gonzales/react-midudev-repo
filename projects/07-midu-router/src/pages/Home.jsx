import { Link, navigate } from "../Link";

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <p>Esta es una página para crear un React Router desde cero</p>
      <Link to="/about">Ir a Sobre Nosotros</Link>
    </>
  );
}