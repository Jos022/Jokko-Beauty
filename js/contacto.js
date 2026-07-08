const formulario = document.querySelector('.formulario-contacto');

if (formulario) {
    formulario.addEventListener('submit', function (e) {

        e.preventDefault(); 
        
        const inputNombre = document.getElementById('nombre');
        const inputEmail = document.getElementById('email');
        const inputMensaje = document.getElementById('textarea');

        const nombreVal = inputNombre.value.trim();
        const emailVal = inputEmail.value.trim();
        const mensajeVal = inputMensaje.value.trim();

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (nombreVal.length < 3) {
            mostrarNotificacion('Por favor, ingresá un nombre válido (mínimo 3 caracteres).');
            inputNombre.focus();
            return;
        }

        if (!regexEmail.test(emailVal)) {
            mostrarNotificacion('Por favor, ingresá un correo electrónico válido.');
            inputEmail.focus();
            return;
        }

        if (mensajeVal.length < 10) {
            mostrarNotificacion('El mensaje es muy corto. Escribí al menos 10 caracteres.');
            inputMensaje.focus();
            return;
        }

        const datos = new FormData(formulario);

        fetch(formulario.action, {
            method: formulario.method,
            body: datos,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                mostrarNotificacion(`¡Gracias por tu mensaje, ${nombreVal}! Te responderemos pronto.`);
                formulario.reset();
            } else {
                mostrarNotificacion('Hubo un problema con Formspree. Intentá más tarde.');
            }
        })
        .catch(error => {
            console.error('Error en Formspree:', error);
            mostrarNotificacion('Hubo un problema de conexión. Intentá más tarde.');
        });
    });
}