import { Link, navigate } from "../Link";

export default function About() {
  return (
    <>
      <h1>About</h1>
      <div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn3lM0queCIxu_5XXCo-bv95tjAIorzfDASA&usqp=CAU"
          alt="Foto de prueba"
        />
        <p>Hola me llamo Diego y estoy creando un clon de React Router</p>
      </div>
      <Link to="/">Ir a Inicio</Link>
    </>
  );
}