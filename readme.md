# miCV — David Cruz López

Curriculum Vitae / portafolio personal en formato web. Sitio estático de una sola página
(one-page) con navegación por secciones, animaciones al hacer scroll y diseño responsive.

🔗 **Demo:** https://08walker.github.io/portafolio-cv/

## Contenido del sitio

| Sección | Descripción |
|---|---|
| Inicio | Presentación, efecto de escritura con los roles y datos de contacto |
| Sobre Mí | Perfil profesional, contadores animados y áreas de trabajo |
| Habilidades | Stack dividido en Backend, Frontend, Datos y Herramientas + especialidades |
| Experiencia | Línea de tiempo con la trayectoria profesional |
| Proyectos | Proyectos destacados (VIP To Travel, eBrumpá, Farmacia Cubana, Havana Ship, Mandao, Dartur…) |
| Formación | Ingeniería Informática (CUJAE), DELF B1 e idiomas |

## Estructura

```
miCV/
├── index.html      # Todo el contenido del CV
├── css/main.css    # Estilos propios (sobre Bootstrap 5)
├── js/main.js      # Navbar, scroll spy, reveal, contadores y efecto typing
├── img/            # Imágenes
├── icon.ico        # Favicon
└── readme.md
```

## Tecnologías

- HTML5 y CSS3
- JavaScript (vanilla, sin build ni dependencias locales)
- [Bootstrap 5.3](https://getbootstrap.com/) + Bootstrap Icons (vía CDN)
- jQuery 3.7 y Google Fonts (Poppins), vía CDN

## Uso

Al ser un sitio estático no necesita compilación ni servidor con PHP: basta con abrir
`index.html` en el navegador.

Si prefieres servirlo por HTTP (recomendado para probar el scroll spy y las anclas):

```bash
# con el proyecto en el directorio actual
python -m http.server 8000
# luego abrir http://localhost:8000
```

En WAMP también funciona colocándolo en `www/miCV` y visitando
`http://localhost/miCV/`.

## Detalles de implementación

- **Sin dependencias locales:** no hay `node_modules`, `package.json` ni pasos de build.
  Todas las librerías se cargan desde CDN.
- **Accesibilidad y movimiento:** `js/main.js` respeta `prefers-reduced-motion`; cuando el
  usuario lo tiene activo se muestran los textos y contadores sin animación.
- **Animaciones al hacer scroll:** se usan `IntersectionObserver` para revelar secciones y
  para lanzar los contadores del bloque «Sobre Mí».
- **Barra de progreso** de scroll, navbar con sección activa y botón «volver arriba».

## Contacto

- Email: davicruzlopez@gmail.com
- LinkedIn: https://www.linkedin.com/in/david-cruz-l%C3%B3pez-006731124
- GitHub: https://github.com/08walker

---

© 2026 David Cruz López. Todos los derechos reservados.
