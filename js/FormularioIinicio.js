import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { auth } from "./firelogin.js";
import { mostrarMensaje } from "./MostrarMensaje.js";

const FormularioInicio = document.querySelector("#formInicio");

FormularioInicio.addEventListener("submit", async e => {
    e.preventDefault();
    
    const emailInput = FormularioInicio.querySelector("#login-email").value.trim();
    const password = FormularioInicio.querySelector("#login-password").value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailInput)) {
        mostrarMensaje("Formato de correo electrónico no válido", "error");
        return;
    }

    try {
        const credentials = await signInWithEmailAndPassword(auth, emailInput, password);
        mostrarMensaje("Inicio de sesión exitoso", "success");
        cerrarModal('#loginModal');
        FormularioInicio.reset();
    } catch (error) {
        const errorMessage = {
            "auth/invalid-credential": "Email o contraseña incorrecta",
            "auth/user-not-found": "Usuario no encontrado",
            "auth/too-many-requests": "El acceso a esta cuenta ha sido temporalmente desactivado debido a demasiados intentos de inicio de sesión fallidos.",
        }[error.code] || "Error de inicio de sesión. Por favor, inténtalo de nuevo.";

        mostrarMensaje(errorMessage, "error");
        console.error(errorMessage, "error");
    }
});

function cerrarModal(selector) {
    const modalInstance = bootstrap.Modal.getInstance(document.querySelector(selector));
    if (modalInstance) modalInstance.hide();
}

