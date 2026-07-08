const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorDestacados = document.getElementById('contenedor-destacados');

async function cargarProductos() {
    try {
        const response = await fetch('./data/productos.json');
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo JSON de productos');
        }
        const productos = await response.json();
        
        if (contenedorDestacados) {
            const listaDestacados = productos.slice(0, 3);
            renderizarSeccion(contenedorDestacados, listaDestacados);
        } else if (contenedorProductos) {
            renderizarSeccion(contenedorProductos, productos);
        }
        
    } catch (error) {
        console.error('Hubo un problema con el fetch:', error);
        if (contenedorProductos) contenedorProductos.innerHTML = `<p class="error-mensaje">Lo sentimos, no pudimos cargar los productos.</p>`;
        if (contenedorDestacados) contenedorDestacados.innerHTML = `<p class="error-mensaje">Lo sentimos, no pudimos cargar los destacados.</p>`;
    }
}

function renderizarSeccion(contenedor, listaProductos) {
    if (!contenedor) return;
    contenedor.innerHTML = '';
    
    const carrito = obtenerCarritoStorage() || [];

    listaProductos.forEach(producto => {
        const card = document.createElement('article');
        card.classList.add('Card', 'productos');

        const productoEnCarrito = carrito.find(item => item.id === producto.id);
        let botonHTML = '';

        if (productoEnCarrito) {
            botonHTML = `
                <div class="item-cantidad-catalogo">
                    <button class="btn-cantidad-cat restar-cat" data-id="${producto.id}">-</button>
                    <span class="cantidad-cat-num">${productoEnCarrito.cantidad}</span>
                    <button class="btn-cantidad-cat sumar-cat" data-id="${producto.id}">+</button>
                </div>
            `;
        } else {
            botonHTML = `<button class="btn-buy" data-id="${producto.id}">Añadir al carrito</button>`;
        }

        card.innerHTML = `
            <img src="${producto.imagen || './img/placeholder.png'}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p class="Descripcion">${producto.descripcion}</p>
            <div class="precio">$${producto.precio.toLocaleString('es-AR')}</div>
            <div class="contenedor-accion-cat">${botonHTML}</div>
        `;
        contenedor.appendChild(card);
    });

    configurarEventosSeccion(contenedor, listaProductos);
}

function configurarEventosSeccion(contenedor, productos) {
    contenedor.onclick = (e) => {
        const idProducto = parseInt(e.target.getAttribute('data-id'));
        if (!idProducto) return;

        const productoSeleccionado = productos.find(p => p.id === idProducto);
        let carrito = obtenerCarritoStorage() || [];
        const index = carrito.findIndex(item => item.id === idProducto);

        if (e.target.classList.contains('btn-buy')) {
            carrito.push({ ...productoSeleccionado, cantidad: 1 });
            guardarCarritoStorage(carrito);
            actualizarContadorHeader();
            mostrarNotificacion(`¡Agregaste ${productoSeleccionado.nombre} al carrito! `);
            renderizarSeccion(contenedor, productos);
        } 
        else if (e.target.classList.contains('sumar-cat')) {
            if (index !== -1) {
                carrito[index].cantidad += 1;
                guardarCarritoStorage(carrito);
                actualizarContadorHeader();
                renderizarSeccion(contenedor, productos);
            }
        } 
        else if (e.target.classList.contains('restar-cat')) {
            if (index !== -1) {
                carrito[index].cantidad -= 1;
                if (carrito[index].cantidad === 0) {
                    carrito.splice(index, 1);
                    mostrarNotificacion(`Quitaste ${productoSeleccionado.nombre} del carrito.`);
                }
                guardarCarritoStorage(carrito);
                actualizarContadorHeader();
                renderizarSeccion(contenedor, productos);
            }
        }
    };
}

cargarProductos();