# GAID · Sitio de pruebas independiente

Versión HTML de GAID preparada para GitHub Pages. **No reemplaza ni altera el proyecto React original.**

## Contenido

- `index.html`: sitio autónomo; incluye todos los estilos, scripts, datos de guía y la imagen de portada.
- `.github/workflows/pages.yml`: publicación automática en GitHub Pages tras cambios en `main`.
- `.nojekyll`: desactiva el procesamiento Jekyll.

## Publicar en GitHub de ANEMEX

1. Solicita a TI un repositorio **nuevo y vacío** en la organización corporativa, por ejemplo `gaid-pruebas`.
2. Confirma que el contenido está autorizado para publicación web. GitHub Pages puede hacer el sitio público aunque el repositorio sea privado.
3. Sube el contenido de esta carpeta a la raíz de ese repositorio, conservando `.github/workflows/pages.yml` y `.nojekyll`.
4. En GitHub, abre **Settings → Pages → Build and deployment → Source** y selecciona **GitHub Actions**.
5. En **Actions**, verifica la ejecución del flujo `Publicar GAID de pruebas`.
6. Cuando termine correctamente, GitHub mostrará el enlace en **Settings → Pages**; habitualmente sigue el patrón `https://ORGANIZACION.github.io/gaid-pruebas/`.

## Uso y límites de esta prueba

- Menú de 15 apartados, buscador, 77 acciones marcables y bitácora exportable a CSV.
- Los registros y las marcas se almacenan **solo en el navegador/dispositivo**, mediante `localStorage` (no se comparten con otros visitantes ni se sincronizan).
- No hay autenticación ni base de datos. **No ingresar datos personales o sensibles reales** durante estas pruebas públicas.
- No incluye formularios de envío de información a ANEMEX.
- Los textos y los trámites requieren validación institucional antes de declarar el sitio como oficial.

Para volver a publicar una revisión, actualiza únicamente `index.html` en este repositorio independiente y confirma la ejecución de GitHub Actions.
