const contenedorCarrito = document.getElementById('contenedor-carrito');
const precioTotalElemento = document.getElementById('precio-total');
const btnVaciar = document.getElementById('btn-vaciar');
const btnComprar = document.getElementById('btn-comprar');
const modalCompra = document.getElementById('modal-compra');
const btnCerrarModal = document.getElementById('cerrar-modal');
const formFinalizarCompra = document.getElementById('form-finalizar-compra');

function renderizarCarrito() {
    const carrito = obtenerCarritoStorage();

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = `<p class="carrito-vacio">Tu carrito está vacío. ¡Visita la sección de productos para llenarlo!</p>`;
        precioTotalElemento.innerText = "$0";
        btnVaciar.style.display = 'none';
        btnComprar.style.display = 'none';

        actualizarContadorHeader();
        return;
    }

    btnVaciar.style.display = 'inline-block';
    btnComprar.style.display = 'inline-block';

    contenedorCarrito.innerHTML = '';

    carrito.forEach(producto => {
        const item = document.createElement('article');
        item.classList.add('Card', 'item-carrito');

        const subtotal = producto.precio * producto.cantidad;

        item.innerHTML = `
            <img src="${producto.imagen || './img/placeholder.png'}" alt="${producto.nombre}">
            <div class="item-info">
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio.toLocaleString('es-AR')}</p>
            </div>
            <div class="item-cantidad">
                <button class="btn-cantidad restar" data-id="${producto.id}">-</button>
                <span>${producto.cantidad}</span>
                <button class="btn-cantidad sumar" data-id="${producto.id}">+</button>
            </div>
            <div class="item-subtotal">
                Subtotal: $${subtotal.toLocaleString('es-AR')}
            </div>
            <button class="btn-eliminar" data-id="${producto.id}">Eliminar</button>
        `;

        contenedorCarrito.appendChild(item);
    });

    actualizarTotal(carrito);
    configurarControlesCarrito();
}

function actualizarTotal(carrito) {
    const total = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    precioTotalElemento.innerText = `$${total.toLocaleString('es-AR')}`;
}

function configurarControlesCarrito() {
    contenedorCarrito.onclick = (e) => {
        const carrito = obtenerCarritoStorage();
        
        const id = parseInt(e.target.getAttribute('data-id'));
        if (!id) return; 

        const index = carrito.findIndex(item => item.id === id);
        if (index === -1) return; 

        if (e.target.classList.contains('sumar')) {
            carrito[index].cantidad += 1; 
        } 

        else if (e.target.classList.contains('restar')) {
            carrito[index].cantidad -= 1; 
            
            if (carrito[index].cantidad === 0) {
                carrito.splice(index, 1);
            }
        } 

        else if (e.target.classList.contains('btn-eliminar')) {
            carrito.splice(index, 1); 
        }

        guardarCarritoStorage(carrito);
        actualizarContadorHeader();
        renderizarCarrito();
    };
}

btnVaciar.addEventListener('click', () => {
    limpiarCarritoStorage();
    actualizarContadorHeader();
    renderizarCarrito();
    mostrarNotificacion('¡Vaciaste tu carrito de compras! 🌸');
});

btnComprar.addEventListener('click', () => {
    modalCompra.style.display = 'flex';
});

btnCerrarModal.addEventListener('click', () => {
    modalCompra.style.display = 'none';
});

formFinalizarCompra.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombreCliente = document.getElementById('nombre-compra').value.trim();
    const direccionCliente = document.getElementById('direccion-compra').value.trim();

    modalCompra.style.display = 'none';
    mostrarNotificacion(`¡Redirigiendo a WhatsApp, ${nombreCliente}! `);

    const mensajeSuave = encodeURIComponent(`¡Hola Jokko Beauty! Mi nombre es ${nombreCliente}. Quiero finalizar la compra de mi carrito para enviar a la dirección: ${direccionCliente}.`);

    setTimeout(() => {
        window.open(`https://wa.me/5491122334455?text=${mensajeSuave}`, '_blank');

        limpiarCarritoStorage();
        actualizarContadorHeader();
        renderizarCarrito();
        formFinalizarCompra.reset(); 
    }, 1500);
});
renderizarCarrito();