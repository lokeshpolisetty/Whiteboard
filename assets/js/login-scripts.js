(function () {
    'use strict';

    // Bootstrap form validation for login form
    var form = document.querySelector('#loginForm');

    if (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);

        // Clear validation on input
        form.querySelectorAll('input').forEach(function (input) {
            input.addEventListener('input', function () {
                if (form.classList.contains('was-validated')) {
                    form.classList.remove('was-validated');
                }
            });
        });
    }
})();