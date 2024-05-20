const loggedOutLinks = document.querySelectorAll(".logged-out");
    const loggedInLinks = document.querySelectorAll(".logged-in");

    console.log(loggedOutLinks);
    console.log(loggedInLinks);

    export const loginCheck = user => {
        if (user) {
            // El usuario está autenticado
            loggedOutLinks.forEach(link => link.style.display = "none");
            loggedInLinks.forEach(link => link.style.display = "block");
        } else {
            // El usuario no está autenticado
            loggedOutLinks.forEach(link => link.style.display = "block");
            loggedInLinks.forEach(link => link.style.display = "none");

            // Abre el modal de inicio de sesión después de 3 segundos
            setTimeout(() => {
                let loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
                loginModal.show();
            }, 3000);
        }
    }
