export function mostrarMensaje(message, type) {
    Toastify({
        text: message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: type === "success" ? "linear-gradient(to right, #00b09b, #96c93d)" : "linear-gradient(to right, #ff0000, #990000)",
        },
        onClick: function () { } // Callback after click
    }).showToast();
}