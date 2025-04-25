(function () {
    'use strict';

    // Bootstrap form validation for login and signup forms
    var forms = document.querySelectorAll('#loginForm, #signupForm');

    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            // Custom password validation for signup
            if (form.id === 'signupForm') {
                var password = form.querySelector('#password');
                if (password.value.length < 6) {
                    password.setCustomValidity('Password must be at least 6 characters long.');
                } else {
                    password.setCustomValidity('');
                }
            }

            form.classList.add('was-validated');
        }, false);

        // Clear custom validity on input
        form.querySelectorAll('input').forEach(function (input) {
            input.addEventListener('input', function () {
                if (input.type === 'password' && form.id === 'signupForm') {
                    if (input.value.length >= 6) {
                        input.setCustomValidity('');
                    }
                }
                if (form.classList.contains('was-validated')) {
                    form.classList.remove('was-validated');
                }
            });
        });
    });
})();