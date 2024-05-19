import { FacebookAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { auth } from "./firelogin.js";
import { mostrarMensaje } from "./MostrarMensaje.js";

const FacebookButton = document.querySelectorAll('.login100-social-item.bg1');

const cerrarModal = (selector) => {
    const modalElement = document.querySelector(selector);
    if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
            modalInstance.hide();
        }
    }
};

const iniciarSesionConFacebook = async () => {
    const provider = new FacebookAuthProvider();

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

FacebookButton.forEach(button => {
    button.addEventListener('click', iniciarSesionConFacebook);
});
