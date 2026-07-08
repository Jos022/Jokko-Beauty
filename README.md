# Jokko Beauty | E-commerce de Cosmética

¡Bienvenidos a **Jokko Beauty**! Este es un proyecto de e-commerce minimalista y consciente enfocado en la venta de productos de skin care. La aplicación está diseñada con una estética limpia y enfocada en una experiencia de usuario (UX) fluida y sin fricciones.

---

## Características y Funcionalidades

* **Navegación Fluida (Single Page Feel):** Todo el flujo de la web evita redirecciones innecesarias. 
* **Catálogo e Inicio Dinámicos:** Los productos destacados de la Home y el catálogo completo se renderizan dinámicamente mediante `fetch` desde un archivo JSON local.
* **Controles de Cantidad Integrados (UX/UI Boost):** Al hacer clic en "Añadir al carrito", el botón muta dinámicamente a un control de incremento/decremento (`- 1 +`) dentro de las mismas tarjetas de producto.
* **Persistencia de Datos:** El carrito de compras se conserva de forma local utilizando `LocalStorage`.
* **Contador Global en Header:** El número total de productos en el carrito se sincroniza de forma automática en todas las pestañas de la web (`index.html`, `productos.html`, `contacto.html`, `carrito.html`).
* **Formulario de Contacto Asincrónico:** Conexión con **Formspree** integrada mediante `fetch` para enviar los mensajes en segundo plano, evitando pantallas externas de éxito y manejando las validaciones con notificaciones personalizadas dentro del sitio.
* **Checkout directo a WhatsApp:** El formulario de compra final recopila los datos de entrega y genera un mensaje automatizado listo para enviar al canal de atención.

---

## Tecnologías Utilizadas

* **HTML5** - Estructura semántica.
* **CSS3** - Diseño responsivo (Flexbox/Grid), variables globales de color y animaciones tiernas para las notificaciones.
* **JavaScript (Vanilla ES6):**
    * Manipulación dinámica del DOM.
    * Delegación de eventos (`.onclick`) para optimización de rendimiento y control del ciclo de vida de los botones.
    * Manejo asincrónico con `Async/Await` y `Fetch API`.
    * `LocalStorage` para persistencia del estado.

---

## Estructura del Proyecto

```text
├── css/
│   └── index.css              # Estilos unificados y diseño responsive
├── data/
│   └── productos.json         # Base de datos local de productos
├── js/
│   ├── storage.js             # Funciones globales, LocalStorage y lógica del Header
│   ├── productos.js           # Renderizado de Catálogo e Inicio 
│   ├── carrito.js             # Lógica de renderizado, suma/resta y modal de WhatsApp
│   └── contacto.js            # Validación y envío asincrónico a Formspree
├── img/                       # Recursos visuales (Imágenes de productos y logos)
├── index.html                 # Página de inicio (Destacados)
├── productos.html             # Catálogo de productos completo
├── contacto.html              # Formulario de contacto
└── carrito.html               # Detalle de compra y formulario de checkout