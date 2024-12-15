document.addEventListener('DOMContentLoaded', function () {
    const phoneNumbers = {
        'Lau': '+5492644862757',
        'Maria': '',
        'Santi': '1122334455',
        'Sabri': '+5491153221138',
        // Puedes agregar más usuarios aquí
    };

    // Función para mostrar ventana emergente personalizada
    function showMessage(message, title, showInput, callback) {
        // Crear overlay (fondo oscuro)
        const overlay = document.createElement('div');
        overlay.classList.add('custom-prompt-overlay');

        // Crear caja de mensaje
        const messageBox = document.createElement('div');
        messageBox.classList.add('custom-prompt-box');

        // Título
        const messageTitle = document.createElement('h2');
        messageTitle.textContent = title; // El título será el nombre del usuario + "dice:"
        messageBox.appendChild(messageTitle);

        // Contenido del mensaje
        const messageContent = document.createElement('p');
        messageContent.textContent = message;
        messageBox.appendChild(messageContent);

        // Si el parámetro `showInput` es verdadero, mostrar el campo de entrada
        if (showInput) {
            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.placeholder = 'Ingresa tu nombre';
            messageBox.appendChild(inputField);

            // Botón de enviar
            const submitButton = document.createElement('button');
            submitButton.textContent = 'Enviar';
            submitButton.addEventListener('click', function () {
                const userName = inputField.value.trim(); // Obtener el nombre del campo de entrada
                if (userName) {
                    callback(userName); // Llamar al callback con el nombre
                    document.body.removeChild(overlay); // Cerrar la ventana emergente
                } else {
                    // Si el nombre no está ingresado, mostrar un mensaje de error
                    messageContent.textContent = 'Por favor, ingresa tu nombre.';
                    messageContent.style.color = 'white'; // Cambiar el color del mensaje de error
                }
            });
            messageBox.appendChild(submitButton);
        } else {
            // Mostrar solo el botón de cerrar si no se ingresa nombre
            const closeButton = document.createElement('button');
            closeButton.textContent = 'Cerrar';
            closeButton.addEventListener('click', function () {
                document.body.removeChild(overlay); // Cerrar la ventana emergente
            });
            messageBox.appendChild(closeButton);
        }

        // Añadir la caja y el overlay al cuerpo
        overlay.appendChild(messageBox);
        document.body.appendChild(overlay);
    }

    // Seleccionar todos los botones
    const buttons = document.querySelectorAll('button');

    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            const userId = button.getAttribute('data-user-id');
            const phoneNumber = phoneNumbers[userId];

            if (phoneNumber) {
                // Si el número existe, pedir el nombre con la ventana emergente
                showMessage('¿Quién es?', `${userId} dice:`, true, function (userName) {
                    const message = `Soy ${userName}, estoy en la puerta de tu casa`;
                    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                    window.location.href = whatsappLink;
                });
            } else {
                // Si el número no está disponible, solo mostrar mensaje y botón de cerrar
                showMessage("No estoy disponible en este momento, envíame un mensaje o llama a alguien más.", `${userId} dice:`, false, function () {});
            }
        });
    });
});
