import {signOut} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import {auth} from "./firelogin.js";
import { mostrarMensaje } from "./MostrarMensaje.js";
const logout = document.querySelector('#cerrarsesion')


logout.addEventListener('click', async()=>{
    await signOut(auth) 
    console.log("Cerrando sesion...")
    mostrarMensaje("Sesion cerrada con exito")
})