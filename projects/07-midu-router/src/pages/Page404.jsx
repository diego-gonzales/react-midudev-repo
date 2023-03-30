import { Link } from "../Link";

export default function PageNotFound() {
  return (
    <>
      <div>
        <h1>404</h1>
        <p>Esta página no existe</p>
        <img
          src="https://midu.dev/images/this-is-fine-404.gif"
          alt="This is not fine dog burning"
        />
      </div>
      <Link to="/">Regresar al inicio</Link>
    </>
  );
}
