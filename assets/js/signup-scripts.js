(function () {
    'use strict';

    // Bootstrap form validation for signup form
    var form = document.querySelector('#signupForm');

    if (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            // Custom password validation
            var password = form.querySelector('#password');
            if (password.value.length < 6) {
                password.setCustomValidity('Password must be at least 6 characters long.');
            } else {
                password.setCustomValidity('');
            }

            form.classList.add('was-validated');
        }, false);

        // Clear validation on input
        form.querySelectorAll('input').forEach(function (input) {
            input.addEventListener('input', function () {
                if (input.type === 'password') {
                    if (input.value.length >= 6) {
                        input.setCustomValidity('');
                    }
                }
                if (form.classList.contains('was-validated')) {
                    form.classList.remove('was-validated');
                }
            });
        });
    }
})();