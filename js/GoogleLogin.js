import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { auth } from "./firelogin.js";
import { mostrarMensaje } from "./MostrarMensaje.js";

const googleButton = document.querySelectorAll('.login100-social-item.bg3');

const cerrarModal = (selector) => {
    const modalElement = document.querySelector(selector);
    if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
            modalInstance.hide();
        }
    }
};

const iniciarSesionConGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
        const credential = await signInWithPopup(auth, provider);
        console.log(credential);

        // Mostrar mensaje de bienvenida
        mostrarMensaje('Bienvenido ' + credential.user.displayName, 'success'); 

        // Cerrar modales
        cerrarModal('#loginModal');
        cerrarModal('#registerModal');

    } catch (error) {
        console.log(error);
    }
};

googleButton.forEach(button => {
    button.addEventListener('click', iniciarSesionConGoogle);
});
