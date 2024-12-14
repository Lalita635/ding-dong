document.addEventListener('DOMContentLoaded', function () {
    // Números de teléfono (mantenidos solo en el JavaScript)
    const phoneNumbers = {
        'lau': '+5492644862757',
        'maria': '0987654321',
        'santi': '1122334455',
        'sabri': '+5491153221138',
        // Puedes agregar más usuarios aquí
    };

    // Botones de usuario
    const buttons = document.querySelectorAll('button');

    buttons.forEach(function(button) {
        button.addEventListener('click', function () {
            // Pedimos el nombre del usuario
            const userName = prompt("¿Quíen es?");
            
            if (userName) {
                // Obtenemos el ID del usuario (que está en un atributo `data-user-id` de cada botón)
                const userId = button.getAttribute('data-user-id');

                // Verificamos si el userId existe en el objeto de números
                const phoneNumber = phoneNumbers[userId];

                if (phoneNumber) {
                    // Creamos el mensaje a enviar
                    const message = `Soy ${userName}, estoy en la puerta de tu casa`;

                    // Construimos el enlace para redirigir a WhatsApp
                    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                    
                    // Redirigimos al usuario a WhatsApp
                    window.location.href = whatsappLink;
                } else {
                    alert("No está disponible en este moemento.");
                }
            } else {
                alert("Por favor, ingresa tu nombre.");
            }
        });
    });
});
