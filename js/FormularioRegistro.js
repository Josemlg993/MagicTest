import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { auth } from "./firelogin.js";
import { mostrarMensaje } from "./MostrarMensaje.js";

const Registro = document.querySelector("#formregistro");

if (Registro) { // Verificar si el formulario existe en la página actual
    Registro.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = Registro.querySelector("#registraremail").value;
        const contraseña = Registro.querySelector("#registrarcontraseña").value;

        try {
            await createUserWithEmailAndPassword(auth, email, contraseña);
            mostrarMensaje("Registro completado", "success");
            cerrarModal('#registerModal');
            setTimeout(() => window.location.href = "../index.html", 3000);
        } catch (error) {
            const errorMessage = {
                "auth/email-already-in-use": "Email ya registrado",
                "auth/weak-password": "La contraseña es débil",
            }[error.code] || "Error al registrar usuario: " + error.message;

            mostrarMensaje(errorMessage, "error");
            console.error(errorMessage);
        }
    });
}

function cerrarModal(selector) {
    const modal = bootstrap.Modal.getInstance(document.querySelector(selector));
    if (modal) modal.hide();
}