const STORAGE_KEY = 'jokko_carrito';
function obtenerCarritoStorage() {
    const carritoData = localStorage.getItem(STORAGE_KEY);
    return carritoData ? JSON.parse(carritoData) : [];
}
function guardarCarritoStorage(carritoActualizado) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(carritoActualizado));
}
function guardarProductoEnCarrito(producto) {
    const carrito = obtenerCarritoStorage();
    const productoExistente = carrito.find(item => item.id === producto.id);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        const nuevoItem = { ...producto, cantidad: 1 };
        carrito.push(nuevoItem);
    }
    guardarCarritoStorage(carrito);
}
function limpiarCarritoStorage() {
    localStorage.removeItem(STORAGE_KEY);
}
function mostrarNotificacion(mensaje) {
    const toast = document.createElement('div');
    toast.classList.add('toast-notificacion');
    toast.innerText = mensaje;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('ocultar');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

function actualizarContadorHeader() {
    const contadorElemento = document.getElementById('contador-carrito-nav');
    if (!contadorElemento) return;
    const carrito = obtenerCarritoStorage() || [];
    const totalProductos = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    contadorElemento.innerText = totalProductos;
    contadorElemento.classList.add('actualizado');
    setTimeout(() => {
        contadorElemento.classList.remove('actualizado');
    }, 200);
}

document.addEventListener('DOMContentLoaded', actualizarContadorHeader);