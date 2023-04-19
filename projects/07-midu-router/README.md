# Crea un React Router desde cero

- [x] Instalar el linter
- [x] Crear una forma de hacer MPAs (Multiple Page Application)
- [x] Crea una forma de hacer SPAs (Single Page Applications)
- [x] Poder navegar entre páginas con el botón de atrás
- [x] Crear componente Link para hacerlo declarativo
- [x] Crear componente Router para hacerlo más declarativo
- [x] Soportar ruta por defecto (404)
- [x] Soportar rutas con parámetros
- [x] Componente <Route /> para hacerlo declarativo
- [x] Lazy Loading de las rutas
- [x] Hacer un i18n con las rutas
- [ ] Testing
- [ ] Publicar el paquete en NPM

- Colocar esto dentro del script 'prepare': 'npm run test && swc ./src/_.jsx -d lib && rm lib/App.js lib/main.js lib/Router.test.js && cp src/_.js lib' (Lo saqué ya que al ser un monorepo se ejecuta cada vez que se instala un paquete)
