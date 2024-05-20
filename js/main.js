import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { auth } from "./firelogin.js";
import { loginCheck } from "./loginCheck.js";
import "./loginCheck.js";
import "./FormularioRegistro.js";
import "./GoogleLogin.js";
import "./FacebookLogin.js";
import "./cerrarsesion.js";
import "./FormularioIinicio.js";

onAuthStateChanged(auth, async (user) => {
    loginCheck(user);
    console.log(user);
});

(function ($) {
    "use strict";

    // Validación de formularios
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit', function (event) {
        event.preventDefault();
        var check = true;

        input.each(function () {
            if (!validate($(this))) {
                showValidate($(this));
                check = false;
            }
        });

        return check;
    });

    input.focus(function () {
        hideValidate($(this)); // Asegúrate de que `this` se convierte a un objeto jQuery
    });

    function validate(input) {
        var val = input.val().trim();
        if (input.attr('type') == 'email' || input.attr('name') == 'email') {
            return val.match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/);
        } else if (input.attr('name') == 'pass') {
            return val.length >= 6;
        } else {
            return val !== '';
        }
    }

    function showValidate(input) {
        input.parent().addClass('alert-validate');
    }

    function hideValidate(input) {
        input.parent().removeClass('alert-validate');
    }

    // Función para mostrar el contenedor de login
    function mostrarContenedor(contenedor, visible) {
        $(contenedor).animate({ left: visible ? '0' : (contenedor === '#loginContainer' ? '-100%' : '100%'), opacity: visible ? 1 : 0 }, 500, function () {
            $(this).css({ display: visible ? 'block' : 'none' });
        });
    }

    window.mostrarLogin = function () {
        mostrarContenedor('#loginContainer', true);
        mostrarContenedor('#registerContainer', false);
    };

    window.mostrarRegistro = function () {
        mostrarContenedor('#registerContainer', true);
        mostrarContenedor('#loginContainer', false);
    };

    $(function () {
        // Agregar eventos
        $('.txt2').on('click', function (event) {
            event.preventDefault();
            mostrarRegistro();
        });

        $('.atras-form-btn').on('click', function (event) {
            event.preventDefault();
            mostrarLogin();
        });

        // Movimiento inicial de los contenedores
        $('#loginContainer, #registerContainer').css({ left: '-100%', display: 'none', opacity: 0 });
    });

})(jQuery);
